
import axios from 'axios'
import { useState, useEffect } from 'react'
export default function Product() {
  const [category, setCategory] = useState([])
  const [productForm, updateproductForm] = useState({});
  // Example demo category array object with subcategories

  useEffect(() => {
    fetchCategories();
  }, [])

  // Function to fetch category objects and set state
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_HOST}/api/category`, {
        withCredentials: true
      }) // Adjust endpoint as needed
      setCategory(res.data)
      console.log(res.data);

    } catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }


  return (
    <>
      <div className='px-4 py-2'>
        {/* product page will have some components like a product add form , category and subcategory add or edit form */}

        <div className='row row-cols-2'>
          <div className='col p-3 border rounded'>
            <p className='fw-semibold fs-4 text-center'>Add Product Form</p>
            <ProductAddForm category={category} />
          </div>
          <div className='col p-3 border rounded'>
            <p className='fw-semibold fs-4 text-center'>Inventory Overview</p>
            <InventoryOverview />
          </div>
          <div className='col-12 p-3 border rounded'>
            <CategoryForm category={category} fetchNewCategoryList={fetchCategories} />
          </div>
        </div>

      </div>
    </>
  )
}


function ProductAddForm({ category }) {
  const [selectedCategory, setSelectedCategory] = useState(category[0])
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (category.length > 0) {
      setSelectedCategory(category[0]);
    }
  }, [category]);

  const [discountType, setDiscountType] = useState(0);

  const handleCategoryChange = (e) => {
    const cat = category.find(cat => cat.name === e.target.value);
    // console.log(cat);
    setSelectedCategory(cat);
  };

  function validateProductForm(formData) {
    const errors = [];

    // Required fields
    const requiredFields = ['name', 'description', 'price', 'stock', 'brand', 'status'];
    requiredFields.forEach(field => {
      const value = formData.get(field);
      if (!value || value.trim() === '') {
        errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
      }
    });

    // Price validation
    const price = formData.get('price');
    if (price && (isNaN(price) || Number(price) < 0)) {
      errors.push('Price must be a non-negative number.');
    }

    // Stock validation
    const stock = formData.get('stock');
    if (stock && (isNaN(stock) || Number(stock) < 0)) {
      errors.push('Stock must be a non-negative number.');
    }

    // Images validation
    const images = formData.getAll('images');
    if (images.length > 4) {
      errors.push('You can upload up to 4 images only.');
    }
    // Check file types (optional)
    images.forEach(file => {
      if (file && file.name) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
          errors.push(`Invalid image type: ${file.name}`);
        }
      }
    });

    // Keywords (optional, but if present, should be a string)
    const keywords = formData.get('keywords');
    if (keywords && typeof keywords !== 'string') {
      errors.push('Keywords must be a string.');
    }

    // Dimensions and weight (optional, but if present, should be valid)
    const dimensions = formData.get('dimensions');
    if (dimensions && !/^\d+,\d+,\d+$/.test(dimensions.trim())) {
      errors.push('Dimensions must be in the format L,B,H (e.g. 24,40,30).');
    }
    const weight = formData.get('weight');
    if (weight && isNaN(weight)) {
      errors.push('Weight must be a number.');
    }

    return errors;
  }

  function generateSKU(formData) {
    // Use only required fields for SKU generation
    const name = (formData.get('name') || '').trim().toUpperCase().replace(/\s+/g, '');
    const category = (formData.get('category') || '').trim().toUpperCase().replace(/\s+/g, '');
    const subcategory = (formData.get('subcategory') || '').trim().toUpperCase().replace(/\s+/g, '');
    const brand = (formData.get('brand') || '').trim().toUpperCase().replace(/\s+/g, '');

    // Use current timestamp for uniqueness
    const timestamp = Date.now().toString(36).toUpperCase();

    // SKU format: CAT-SUB-NAME-BRAND-UNIQUE
    const sku = `${category.slice(0, 3)}-${subcategory.slice(0, 3)}-${name.slice(0, 3)}-${brand.slice(0, 3)}-${timestamp}`;

    return sku;
  }

  const handleDiscount = (e) => {
    setDiscountType(Number(e.target.value));
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.target);
    const errors = validateProductForm(formData);

    if (errors.length > 0) {
      alert(errors.join('\n'));
      setLoading(false)
      return;
    }
    const SKU = generateSKU(formData);
    formData.append('SKU', SKU);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_HOST}/api/admin/product/addProduct`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );
      if (res.status >= 200 && res.status < 400)
        alert("Product sent successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Failed to add product");
      setLoading(false);
    }
  }



  return (

    <>
      <div>
        <form className='vstack gap-2' onSubmit={handleProductSubmit} encType='multipart/form-data'>


          {/* Product name */}

          <div className='hstack gap-2'>
            <input type="text" name="name" id="" className='form-control' placeholder='Enter Product Name' required />
          </div>

          {/* category and subcategory start here */}
          <div className='d-flex'>
            {/* for select category */}
            <div className='me-2 flex-fill'>
              <label htmlFor="category" className='form-text'>Select Category</label>
              <select name="category" id="" className='form-select' onChange={handleCategoryChange}>
                {
                  category.length > 0 ? category.map((item, index) => (<option value={item.name} key={index}>{item.name}</option>)) : (<option>No category avilable</option>)
                }
              </select>
            </div>
            {/* Select subcategory */}
            <div className='flex-fill'>
              <label htmlFor="subcategory" className='form-text'>Select Subcategory</label>
              <select name="subcategory" className='form-select'>
                {selectedCategory && selectedCategory.subcategories.length > 0
                  ? selectedCategory.subcategories.map((sub, idx) => (
                    <option key={idx} value={sub.name}>{sub.name}</option>
                  ))
                  : <option>No subcategory found</option>
                }
              </select>
            </div>
          </div>
          {/* Keywords */}
          <div>
            <label htmlFor="price" className='form-text'>Keywords for search optimization</label>
            <input type="text" className='form-control' placeholder='keywords (comma seperated) [e.g. bags,school bags,mens]' name="keywords" id="" />
          </div>
          {/* Product drscription */}
          <div>
            <textarea className='form-control' name='description' placeholder='Product Description' />
          </div>
          {/* Price */}

          <div>
            <label htmlFor="price" className='form-text'>Price in Indian Rupee</label>
            <input type="text" name="price" id="" className='form-control' placeholder='Price in INR' required />
          </div>
          {/* discount options (0 for no discount and 1 for individual product discount) */}
          <div>
            <label htmlFor="discountType" className='form-text'>Discount type</label>
            <div className='d-flex'>
              <select name="discountType" onChange={handleDiscount} className='form-select me-2'>
                <option value={0} selected>not applicable</option>
                <option value={1}>Individual type</option>
              </select>
              <input type="text" name="discountValue" placeholder='Enter discount in percentage (e.g. 20 is equivalent to 20% off)' disabled={discountType ? false : true} className='form-control' />
            </div>

          </div>
          {/* Product images */}

          <div>
            <label htmlFor="images" className='form-text'>Select upto 4 images (Only Jpeg/jpg/png format are allowed)</label>
            <input type="file" name="images" className='form-control' id="" accept='image/*' multiple />
          </div>
          {/* Stock available */}

          <div>
            <input type="number" name="stock" className='form-control' id="" placeholder='Enter Available Stock' />
          </div>
          {/* Brand name of product */}

          <div>
            <input type="text" name="brand" placeholder='Enter Brand Name' id="" className='form-control' />
          </div>
          {/* Status of prodcut */}

          <div>
            <select name="status" className='form-select' id="">
              <option value="active">Active</option>
              <option value="inactive">In-Active</option>
              <option value="archived">Archieved</option>
              <option value="published">published</option>
              <option value="draft">In-draft</option>
            </select>
          </div>
          {/* Product Dimensions in cm */}
          <div>
            <label htmlFor="dimension" className='form-text'>Size (in cm) for e.g. l,b,h</label>
            <input type="text" name="dimension" id="" placeholder='Product Dimension (in cm as L,B,H) [e.g. 24,40,30]' className='form-control' />
          </div>
          {/* Prdcuct weight in gm */}

          <div>
            <label htmlFor="weight" className='form-text'>Product weight [if not applicable type 0]</label>
            <input type="text" name="weight" id="" placeholder='Weight in gm' className='form-control' />
          </div>

          <div>
            <label htmlFor="colorVariants" className='form-text'>Avaiable Color Variants (make sure spelling is correct)</label>
            <input type='text' className="form-control" name="colorVariants" placeholder='Color variants (e.g. black,brown,green)' />
          </div>

          <button type="submit" className='btn btn-success fw-semibold' disabled={isLoading ? true : false}>


            {
              isLoading ? (
                <div className='d-flex algin-items-center justify-content-center'>
                  <span className='spinner-border me-3'></span>
                  <span>Loading... Please Wait</span>
                </div>
              ) : (
                <div>
                  <span>
                    Add Product
                  </span>
                </div>
              )
            }
          </button>

        </form>

        {
          isLoading.status ? (<p className='fw-bold'>Loading PLease wait ...</p>) : null
        }
      </div>
    </>
  )
}

// categroy main form starts here


function CategoryForm({ category, fetchNewCategoryList }) {
  const [newCategory, setNewCategory] = useState(false)
  const [selectedCategory, selectCategory] = useState(null)
  useEffect(() => {
    if (category.length > 0 && !selectedCategory) {
      selectCategory(category[0].name);
    }
  }, [category]);

  const subCategoryObjectForSelectedCategory = category.find(cat => cat.name === selectedCategory);

  const handleCategoryChange = (e) => {
    selectCategory(e.target.value);
    console.log(e.target.value);
    // console.log(subCategoryObjectForSelectedCategory);
  }


  const handleAddCategory = async (e) => {
    e.preventDefault();
    const newFormData = new FormData(e.target)
    console.log(newFormData);
    const name = (newFormData.get('name')).trim();

    if (name === "" || name == null || name == undefined) {
      alert("Error: Please enter a valid categroy name")
    } else {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_HOST}/api/admin/product/category`, { name }, {
          withCredentials: true
        })

        alert(res.data.name, " : new categroy added successfully");
        await fetchNewCategoryList();
      } catch (err) {
        alert("Error : Something went wrong while adding new categroy = ", name);
        console.error(err);
      }
    }
    console.log(name);
  }

  const handleAddSubcategory = async (e) => {
    e.preventDefault()
    const newSubcategoryFormData = new FormData(e.target);
    const newSubcategory = (newSubcategoryFormData.get('name')).trim();
    // newSubcategory = newSubcategory.trim();
    if (!selectedCategory || !newSubcategory) {
      alert("Please select a category and enter a valid subcategory name")
      return
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_HOST}/api/admin/product/subcategory`, {
        categoryName: selectedCategory,
        subcategoryName: newSubcategory
      }, {
        withCredentials: true
      })
      alert("Subcategory added successfully")
      await fetchNewCategoryList()
    } catch (err) {
      alert("Error adding subcategory")
      console.error(err)
    }
    console.log(newSubcategory);

  }

  return (
    <>
      <div className='row row-cols-2 mt-3 border'>
        {/* Add new category form */}

        <div className='vstack gap-2'>
          <p className='fw-semibold fs-4 text-center m-3'>Add/Edit Category Form</p>

          <form className='d-flex justify-content-between' onSubmit={handleAddCategory}>
            <input className='form-control me-2 w-75' type="text" name="name" placeholder='Enter New Category Name' />
            <button type="submit" className='btn btn-success'>Add Category</button>
          </form>

          {/* category list */}


          <ol className='list-group list-group-numbered'>
            {
              category.length > 0 ? category.map((item, index) => (<li className='list-group-item' key={index}>{item.name}</li>)) : (<p>No categroy found</p>)
            }
          </ol>
        </div>

        {/* add new subcategroy form */}

        <div className='vstack gap-2'>
          <p className='fw-semibold fs-4 text-center m-3'>Add/Edit SubCategory Form</p>
          {
            category.length > 0 ? (
              <select onChange={(e) => handleCategoryChange(e)} className='form-select'>
                {
                  category.map((item, index) => (<option key={index} defaultValue>{item.name}</option>))
                }
              </select>
            ) : <label>No Categroy Found</label>
          }
          <form className='d-flex justify-content-between' onSubmit={handleAddSubcategory}>
            <input className='form-control me-2 w-75' type="text" name="name" placeholder='Enter New Category Name' />
            <button type="submit" className='btn btn-success'>Add Subcategory</button>
          </form>

          {/* subcategroy list for a selected category */}

          <ol className='list-group list-group-numbered'>
            {
              subCategoryObjectForSelectedCategory && subCategoryObjectForSelectedCategory.subcategories.length > 0 ? subCategoryObjectForSelectedCategory.subcategories.map((item, index) => (<li className='list-group-item' key={index}>{item.name}</li>)) : (<p>no subcategroy</p>)
            }
          </ol>
        </div>

      </div>
    </>
  )
}

function InventoryOverview() {
  const [totalProducts, setProductCount] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [searchedProduct, setSearchProduct] = useState(null)

  const handleProductUpdate = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_HOST}/api/admin/product/inventoryoverview`, {
        withCredentials: true
      });

      setProductCount(res.data);
      setLoading(false);
    } catch (err) {
      alert(err)
    }
  }


  const handleProductSearch = async (e) => {
    e.preventDefault();
    if (e.target.value == "") return;
    console.log(e.target.value);

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_HOST}/api/admin/product/getProduct?sku=${e.target.value}`, {
        withCredentials: true
      })
      setSearchProduct(res.data);
      // console.log(e.target.value);
      console.log(res.data);

    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    handleProductUpdate();
  }, [])
  return (
    <>
      <div className='row m-0 row-cols-2'>
        <div className='col p-2'>
          <div className='d-flex justify-content-center align-items-center flex-column py-2 shadow-sm border rounded'>
            {
              totalProducts ? (
                <p className='fs-4 fw-semibold mt-2'>{totalProducts.productCount} items</p>
              ) : (
                <div className='spinner-border text-primary mt-2' role='status'></div>
              )
            }
            <p className='fw-semibold fs-5 mt-3'>Product Count</p>
          </div>
        </div>

        <div className='col p-2'>
          <div className='d-flex justify-content-center align-items-center flex-column py-2 shadow-sm border rounded'>
            {
              totalProducts ? (
                <p className='fs-4 fw-semibold mt-2'>{totalProducts.totalValuation} INR</p>
              ) : (
                <div className='spinner-border text-primary mt-2' role='status'></div>
              )
            }
            <p className='fw-semibold fs-5 mt-3'>Total Valuation</p>
          </div>
        </div>

        <div className='col-12'>
          <form className='d-flex mb-3'>
            <input type="search" name="searchSKU" onChange={handleProductSearch} placeholder='Enter Product SKU to search' className='form-control me-2' />
          </form>

          <div className='vstack gap-2'>
            {
              searchedProduct ? (
                searchedProduct.map((item, index) => (
                  <ProductModal key={index} createModal={item} srNo={index + 1} />
                ))
              ) : <p className='p-2 fw-semibold'>No data found</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}

function ProductModal({ createModal, srNo }) {
  return (
    <>
      <div className='row m-0 row-cols-4 align-items-center border'>
        <div className='col border-end'>{srNo}</div>
        <div className='col border-end'>{createModal.name}</div>
        <div className='col border-end'>{createModal.SKU}</div>
        <div className='col'>
          <button type='button' className=' btn text-danger'>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 25">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}