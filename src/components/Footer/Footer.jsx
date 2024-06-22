import { assets, icons } from "../../constants/Images";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.logo_col}>
        <img className={styles.logo_img} src={assets.logo} />
        <p className={styles.copyright_text}>copyright @ 2024 | Live Lens</p>
      </div>
      <div className={styles.footer_col}>
        <p className={styles.footer_text}>Privacy Policy</p>
        <p className={styles.footer_text}>Do not sell my personal info</p>
        <p className={styles.footer_text}>Terms of Service</p>
      </div>
      <div className={styles.footer_col}>
        <div className={styles.about_div}>
          <p className={styles.footer_text}>About</p>
          <p className={styles.footer_text}>Contact</p>
          <p className={styles.footer_text}>Careers</p>
          <p className={styles.footer_text}>Coupons</p>
        </div>
        <div className={styles.social_div}>
          <img
            className={styles.footer_social_icons}
            src={icons.socialIcons}
            alt="LinkedIn"
          />
          <img
            className={styles.footer_social_icons}
            src={icons.socialIcons1}
            alt="Instagram"
          />
          <img
            className={styles.footer_social_icons}
            src={icons.socialIcons2}
            alt="X"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
