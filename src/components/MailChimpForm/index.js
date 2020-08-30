import React from 'react';
import styles from './MailChimpForm.module.scss';


const MailChimpForm = () => {

    return (                
        <div className={styles.formContainer}>
            <div id="mc_embed_signup" class="show">
                <form action="https://tumblr.us5.list-manage.com/subscribe/post?u=ac592e064105819e64ac3aced&amp;id=0ee52da4a1" class="validate" id="mc-embedded-subscribe-form" method="post" name="mc-embedded-subscribe-form" ngnoform="" novalidate="" target="_blank">
                    <div id="mc_embed_signup_scroll">
                        <div class="mc-field-group">
                            <label for="mce-EMAIL" style={{display:'none'}}>Email Address </label>
                            <input class="required email" id="mce-EMAIL" name="EMAIL" placeholder="your email" type="email" value="" />
                        </div>
                        <div class="clear" id="mce-responses">
                            <div class="response" id="mce-error-response" style={{display:'none'}}></div>
                            <div class="response" id="mce-success-response" style={{display:'none'}}></div>
                        </div>
                        <div aria-hidden="true" style={{position: 'absolute', left: '-5000px'}}>
                            <input name="b_ac592e064105819e64ac3aced_0ee52da4a1" tabindex="-1" type="text" value="" />
                        </div>
                        <div class="clear">
                            <input class="button" id="mc-embedded-subscribe" name="subscribe" type="submit" value="yes please!" />
                        </div>
                    </div>
                </form>
            </div>
            <div id="submitSuccess" class="hide">
                <p>Thank you!<br /> Please check your inbox for the download. <br />
                    <span>Have a question? Reach out to info@vanessarusu.com</span>
                </p>
            </div>
        </div>
    )
}

export default MailChimpForm;