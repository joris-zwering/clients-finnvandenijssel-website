import React, { useEffect, useState, useRef } from 'react';
import Header from "../components/header";
import useWindowSize from "../hooks/useWindowSize";
import {useShowcase} from "../hooks/useShowcase";
import {usePortfolioItems} from "../hooks/usePortfolioItems";
import {useAbout} from "../hooks/useAbout";
import '../app.css';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

import {useParams} from 'react-router-dom';

function PortfolioItemPage() {
  const {id} = useParams();
  const [portfolioItem, setPortfolioItem] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [controlsAreVisible, setControlsVisible] = useState(true);

  const [sliderIndexImage, setSliderIndexImage] = useState(0);

  const videoRef = useRef();


  useEffect(() => {
    requestAnimationFrame(() => skewScrolling())
  },[])

    // SKEW
  const app = useRef()
  const scrollContainer = useRef()

  const size = useWindowSize()

  function playVideo() {
    setVideoIsPlaying(true)
    videoRef.current.play()
    setTimeout(() => {
      setControlsVisible(false)
    }, 1000);
  }

  function pauseVideo() {
    setVideoIsPlaying(false)
    videoRef.current.pause()
    setControlsVisible(true)
  }


  const skewConfigs = {
    ease: .1,
    current: 0,
    previous: 0,
    rounded: 0
  }
  

  const skewScrolling = () => {
    skewConfigs.current  = window.scrollY;
    skewConfigs.previous += (skewConfigs.current - skewConfigs.previous) * skewConfigs.ease;
    skewConfigs.rounded = Math.round(skewConfigs.previous * 100) / 100

    const difference = skewConfigs.current - skewConfigs.rounded;
    const acceleration = difference / size.width;
    const velocity = +acceleration;
    const skew = velocity * 10;

    if(scrollContainer.current) {
      scrollContainer.current.style.transform = `translate3d(0, -${skewConfigs.rounded}px, 0) skewY(${skew}deg)`;
    }

    requestAnimationFrame(() => skewScrolling())
  }

  const {portfolio, loading} = usePortfolioItems(id);

  useEffect(() => {
    if(!loading) {
      console.log(loading)
      console.log(portfolio)
      setPortfolioItem(portfolio)
      setIsLoading(false)
    }
  }, [loading])


  // SKEW SHIZZLE
  useEffect(() => {
    document.body.style.height = `${scrollContainer.current.getBoundingClientRect().height}px`
  }, [size]);



  // render Page

  if(isLoading) {
    return(
      <>
      <div ref={app} style={{top: 0, left: 0, height: "100%", width: "100%", pointerEvents: "initial"}}>
      <div ref={scrollContainer} style={{backgroundColor: "#0B0B0B", height: "100vh", width: "100%", scrollSnapType: "y proximity", scrollSnapStop: "always"}} >
      </div>
      </div>
      </>
    )
  }

  return (
    <>
    <div ref={app} style={{top: 0, left: 0, height: "100%", width: "100%", pointerEvents: "initial"}}>
    <div ref={scrollContainer} style={{backgroundColor: "#0B0B0B", height: "100vh", width: "100%", scrollSnapType: "y proximity", scrollSnapStop: "always"}} >
      <section style={{height: "100%", width: "100%", scrollSnapAlign: "center", backgroundColor: "#0F0F0F"}}>
        <div 
        onClick={() => {
          window.location.href = "/";
        }}
        style={{ display: 'flex', position: 'absolute', top: 25, paddingLeft: "3%",  zIndex: 100, alignItems: "center", width: 100, justifyContent: "space-between", transform: 'opacity 2.0s ease-in', cursor: "pointer"}}>
          <img
          style={{height: 25, width: 25}}
          src="/back-arrow.png"
          ></img>
          <span style={{fontFamily: "Poppins-Medium", fontSize: 18, color: "#fff"}}>Back</span>
        </div>
        <div 
        onClick={() => {
          setVideoIsPlaying(!videoIsPlaying)
          if(videoIsPlaying) {
            pauseVideo()
          } else {
            playVideo()
          }
        }}

        style={{display: controlsAreVisible ? 'inherit' : 'none', position: "absolute", alignItems: "center", zIndex: 100, top: '50%', transform: 'translate(-50%, -50%)', left: "50%", textAlign: "center", cursor: "pointer"}}>
          <img src={videoIsPlaying ? "/pause-icon.png" : '/play-icon.png'} 
          style={{height: 50, width: 50}}
          ></img>
          <p style={{fontFamily: "Poppins-Medium", color: "#fff", fontSize: 17, marginTop: 10, fontWeight: 400}}>Click to {videoIsPlaying ? 'pause' : 'play'}</p>
        </div>
        <video
        onClick={() => {
          if(videoIsPlaying) {
            pauseVideo()
          } else {
            playVideo()
          }
        }}
        onMouseMove={() => {
          setControlsVisible(true)
        }}
        ref={videoRef}
        style={{backgroundColor: "#000", opacity: "50%", objectFit: "cover", zIndex: 10, height: "100%", width: "100%"}}
        src={portfolioItem['video']['url']}
        poster={portfolioItem['preview_picture']['url']}
        >
        </video>
      </section>
      <section style={{scrollSnapAlign: "center", backgroundColor: "#0F0F0F"}}>
        <div style={{margin: "auto", width: "50%", minWidth: "300px", maxWidth: "600px"}}>
          <h4 style={{textAlign: "center", color: "#fff", fontSize: 40, paddingTop: 160, color: "#6d898f"}}>{portfolioItem['titel']}</h4>
          <p style={{width: "85%", color: "#cfcbca", fontFamily: "Poppins", fontWeight: 400, margin: "auto", fontSize: "15.5px", lineHeight: "29px", textAlign: "center", paddingTop: 20}}>
            {portfolioItem['paragraaf1']}
          </p>
          <p style={{width: "85%", color: "#cfcbca", fontFamily: "Poppins", fontWeight: 400, margin: "auto", fontSize: "15.5px", lineHeight: "29px", textAlign: "center", paddingTop: 40}}>
            {portfolioItem['paragraaf2'] && portfolioItem['paragraaf2']}
          </p>
        </div>
        <div style={{margin: "auto", width: "50%", minWidth: "300px", maxWidth: "600px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 80}}>
          <div style={{display: "flex", alignItems: "center"}}>
            <h4 style={{textAlign: "center", color: "#fff", fontSize: 20,  color: "#fff"}}>Client:</h4>
            <h4 style={{textAlign: "center", color: "#fff", fontSize: 18,  color: "#fff", fontFamily: "Helvetica Neue", fontWeight: 400, marginLeft: 10}}>{portfolioItem['client']}</h4>
          </div>
          <div style={{display: "flex", alignItems: "center", marginLeft: 20}}>
            <h4 style={{textAlign: "center", color: "#fff", fontSize: 20,  color: "#fff"}}>Date:</h4>
            <h4 style={{textAlign: "center", color: "#fff", fontSize: 18,  color: "#fff", fontFamily: "Helvetica Neue", fontWeight: 400, marginLeft: 10}}>{portfolioItem['datum']}</h4>
          </div>
        </div>
      </section>
      <section style={{height: "100%", width: "100%", scrollSnapAlign: "center", backgroundColor: "#0F0F0F", paddingTop: 160}}>
      <h4 style={{textAlign: "center", color: "#fff", fontSize: 40, color: "#CFC9C9", marginBottom: 50}}></h4>
        {portfolioItem['stills'] &&
        <div style={{height: "100%", width: "100%"}}>
          <div style={{position: "absolute",  display: "flex", flexDirection: "row",  alignItems: "center", justifyContent: "space-between",  width: "100%", height: "100%"}}>
            <img 
            onClick={() => {
              let countItems = portfolioItem['stills'].length-1;

              if(sliderIndexImage == 0) {
                setSliderIndexImage(countItems)
              } else {
                setSliderIndexImage(sliderIndexImage - 1)
              }

            }}
            style={{alignItems: "center", paddingLeft: 50}} src="/back-button.png"></img>
            <img 
            onClick={() => {

              let countItems = portfolioItem['stills'].length-1;

              if(countItems == sliderIndexImage) {
                setSliderIndexImage(0)
              } else {
                setSliderIndexImage(sliderIndexImage + 1)
              }
              console.log(countItems)

            }}
            style={{alignItems: "center", paddingRight: 50}} src="/next-button.png"></img>
          </div>
          <img 
          style={{width: "100vw", height: "100vh", objectFit: "cover"}} src={portfolioItem['stills'][sliderIndexImage]['url']}>
          </img>
        </div>
        }
      </section>
      <section style={{height: "100%", width: "100%", scrollSnapAlign: "center", backgroundColor: "#0F0F0F", paddingTop: 160, maxHeight: 600}}>
      <div style={{ width: "100%", pointerEvents: "initial",  paddingTop: "100px"}}>
        <div style={{color: "#fff", textAlign: "center"}}>
          <h5 style={{fontFamily: "Poppins", fontSize: "17px", fontWeight: 500}}>CONTACT ME</h5>
          <Fade bottom>
          <h1  
          onClick={() => {
            window.location.href = "mailto:hello@finnvandenijssel.com?Subject=Let's have a coffee!";
          }}
          style={{fontSize: "40px", marginTop: 35, cursor: "pointer"}}>Email</h1>
          </Fade>
          <Fade bottom>
          <h1 
          onClick={() => {
            window.open('https://www.linkedin.com/in/finnvandenijssel/', '_blank');
          }}
          style={{fontSize: "40px", marginTop: 15, cursor: "pointer"}}>Linkedin</h1>
          </Fade>
          <Fade bottom>
          <h1 
          onClick={() => {
            window.open('https://www.instagram.com/finnvdijssel_/', '_blank');
          }}
          style={{fontSize: "40px", marginTop: 15, cursor: "pointer"}}>Instagram</h1>
          </Fade>
        </div>
      </div>
      </section>
    </div>
    </div>
    </>
  );
}




export default PortfolioItemPage;
