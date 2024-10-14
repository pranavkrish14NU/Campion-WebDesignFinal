// Home.js
import React from "react";
import HeroImage from "../../assets/home_hero.png";
import InfoImg1 from "../../assets/home-img1.jpg";
import InfoImg2 from "../../assets/home-img2.jpg";
import InfoImg3 from "../../assets/home-img3.jpg";
import CampImg from "../../assets/CampgroundOwner.png";
import {useTranslation} from 'react-i18next'
import i18n from '../../i18n'

import "../../dist/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
const {t} = useTranslation('common');

  return (
    <>
      <section className="hero_container">
        <div className="wavebg">
          <div className="herotext">
            <h2>{t('home.label.campingstarts')}</h2>
            <p>
            {t('home.label.bookcamp')}
            </p>
          </div>
          <div className="heroimg">
            <img src={HeroImage} alt="camping" />
          </div>
        </div>
        <div className="wave_clip"></div>
      </section>


      <section className="home_page_2">
        <div className="section2_header">
          <h2><b>Campion</b> is the <span className="home_keyword">Simplest</span> way to find yourself <span className="home_keyword">outside.</span></h2>
        </div>
        <div className="info_cards_container">
          <div className="info_card">
            <div className="blob_container">
              <img src={InfoImg1} alt="campsite info card 1" />
            </div>
            <div className="info_card_body">
              <h4>{t('home.label.unlock')}</h4>
              <p>
              {t('home.label.easily book')}
              </p>
            </div>
          </div>
          <div className="info_card">
            <div className="blob_container">
              <img src={InfoImg2} alt="campsite info card 2" />
            </div>
            <div className="info_card_body">
              <h4>{t('home.label.discover')}</h4>
              <p>
              {t('home.label.relax')}
              </p>
            </div>
          </div>
          <div className="info_card">
            <div className="blob_container">
              <img src={InfoImg3} alt="campsite info card 3" />
            </div>
            <div className="info_card_body">
              <h4> {t('home.label.protect')}</h4>
              <p>
              {t('home.label.bybooking')}
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="section3">
        <div className="section3_text">
          <h4>{t('home.label.ownormanage')}</h4>
          <p>{t('home.label.listyour')}</p>
          <Link to="/campgrounds/new" >{t('home.label.claim')} {" —>"} </Link>
        </div>
        <div className="section3_img">
          <img src={CampImg} alt="Register Camp" />
        </div>
      </section>
    </>
  );
};

export default Home;