import React from 'react'
import Logo from './img/Logo.jpg'
import {FootWrapper} from './StyledComponents.js'

export default class Footer extends React.Component {
    render() {
        return (
            <FootWrapper>
                <div className="footer text-white py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5 text-center">
                            <img src={Logo} alt='' />
                            <p>At our core, we are just a group of newbies who sell random stuff for money.</p>
                            <strong>Contact Info</strong>
                            <p>(666) 613-4444 <br />MyCompany@rmit.com</p>
                            <a className='text-white' href="https://www.facebook.com/profile.php?id=100016991286991" target='_blank' rel='noreferrer noopener'><i className="fab fa-facebook-square fa-2x"/></a>
                            <a className='text-white' href="https://help.twitter.com/en/twitter-guide" target='_blank' rel='noreferrer noopener'><i className="fab fa-twitter-square fa-2x"/></a>
                            <a className='text-white' href="https://help.instagram.com/454502981253053/" target='_blank' rel='noreferrer noopener'><i className="fab fa-instagram fa-2x"/></a>
                        </div>
                        <hr className="hr" /><br/>
                        &#169; 2019 My E-commerce. All Rights Reserved
		            </div>
                </div>
            </FootWrapper>
        )
    }
}