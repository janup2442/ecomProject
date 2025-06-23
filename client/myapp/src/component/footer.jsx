
// style={{
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr 1fr'
//             }}

export default function Footer() {
    return (
        <>
            <div className="border m-0 row row-cols-3" >
                <div className="border p-2">
                    <img src="/noBgLogo.png" width={150} alt="Kanpuri Classic Leather" />
                    <p className="text-tertiary fw-semibold mt-2 w-75">H 402A-1 Satyam Vihar, Kalyanpur<br />Kanpur, Uttar Pradesh (208017), India</p>
                    <a href="mailto:kanpurileathers.shop@gmail.com" className="fw-semibold nav-link">kanpurileathers.shop@gmail.com</a>
                </div>
                <div className="border p-2">
                    <div className="row row-cols-2">
                        <div className="col">
                            <ul className="vstack gap-3 list-unstyled nav-underline text-center">
                                <li className="nav-item">
                                    <a href="" className="nav-link text-dark">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link text-dark">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link text-dark">Contact Us</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link text-dark">Dealership</a>
                                </li>
                            </ul>

                        </div>
                        <div className="col">
                            <ul className="vstack gap-3 list-unstyled nav-underline text-center">
                                <li className="nav-item">
                                    <a href="" className="nav-link text-dark">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link text-dark">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link text-dark">Contact Us</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link text-dark">Dealership</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border p-2">
                    <div className="d-flex flex-column">
                        <form className="d-flex">
                            <input type="mail" required placeholder="Enter your email" className="form-control me-2" />
                            <button type="button" class="btn btn-outline-dark">
                                Subscribe
                            </button>
                        </form>
                        <p className="form-text mt-2 fw-semibold">*Subscribe to our newsletter and latest releases of product range.</p>

                    </div>
                </div>
            </div>
        </>
    )
}