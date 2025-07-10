import BusinessIcon from '@mui/icons-material/Business';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import Divider from '@mui/material/Divider';
export default function Footer() {
    return (
        <>
            {/* foooter content here */}
            <div className="border-top pt-3 m-0 row row-cols-1 row-cols-sm-2 row-cols-md-3" >
                <div>
                    <div className="p-2">
                        <img src="/noBgLogo.png" width={150} alt="Kanpuri Classic Leather" />
                        <p className="text-muted fw-semibold mt-2 w-75" style={{fontSize:'0.8rem'}}>

                            <BusinessIcon className='me-2' />
                            H 402A-1 Satyam Vihar, Kalyanpur<br />Kanpur, Uttar Pradesh (208017), India</p>
                        <a href="mailto:kanpurileathers.shop@gmail.com" className="fw-semibold nav-link px-2 py-1 border rounded">
                            <ContactMailIcon className='me-2'/>

                            kanpurileathers.shop@gmail.com</a>
                    </div>
                </div>
                <Divider className='d-sm-none' />
                <div>
                    <div className="p-2">
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
                </div>
                <Divider className='d-sm-none' />
                <div>
                    <div className="p-2">
                        <div className="d-flex flex-column">
                            <form className="d-flex">
                                <input type="mail" required placeholder="Enter your email" className="form-control me-2" />
                                <button type="button" class="btn btn-outline-dark">
                                    Subscribe
                                </button>
                            </form>
                            <p className="text-muted mt-2 fw-semibold" style={{ fontSize: '0.8rem' }}>*Subscribe to our newsletter and latest releases of product range.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* copy right text here */}
            <div className='d-flex flex-column flex-sm-row justify-content-between pt-4 pb-1 my-4 border-top px-2'>
                <small className="form-text">@ {new Date().getFullYear()} Kanpuri Classic Leathers. All Right Reserved.</small>
                <ul className='list-unstyled d-flex'>
                    <li className='ms-3'>
                        <a href='' className='text-decoration-none text-dark'>
                            <InstagramIcon />
                        </a>
                    </li>
                    <li className='ms-3'>
                        <a href='' className='text-decoration-none text-dark'>
                            <FacebookIcon />
                        </a>
                    </li>
                    <li className='ms-3'>
                        <a href='' className='text-decoration-none text-dark'>
                            <XIcon />
                        </a>
                    </li>
                    <li className='ms-3'>
                        <a href='' className='text-decoration-none text-dark'>
                            <YouTubeIcon />
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}