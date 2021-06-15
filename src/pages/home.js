import React, { useEffect, useState, useRef } from 'react';
import Header from "../components/header";
import useWindowSize from "../hooks/useWindowSize";
import {useShowcase} from "../hooks/useShowcase";
import {useAbout} from "../hooks/useAbout";
import '../app.css';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

function Home() {
  const ShowcaseSectionRef = useRef();
  const AboutSectionRef = useRef();
  const CaseStudiesRef = useRef();
  const ContactSectionRef = useRef();

  useEffect(() => {
    requestAnimationFrame(() => skewScrolling())
  },[])

    // SKEW
  const app = useRef()
  const scrollContainer = useRef()

  const size = useWindowSize()


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

  const {showcase, loading} = useShowcase();

  useEffect(() => {
    if(!loading) {
      console.log(loading)
      console.log(showcase)
    }
  }, [loading])


  // SKEW SHIZZLE
  useEffect(() => {
    document.body.style.height = `${scrollContainer.current.getBoundingClientRect().height}px`
  }, [size]);



  // render Page

  return (
    <>
    <div ref={app} style={{top: 0, left: 0, height: "100%", width: "100%", pointerEvents: "initial"}}>
    <div ref={scrollContainer} style={{backgroundColor: "#0B0B0B", height: "100vh", width: "100%", scrollSnapType: "y proximity", scrollSnapStop: "always"}} >
      <section style={{height: "100vh", width: "100%", backgroundColor: "#0B0B0B"}}>
        <div style={{width: "100%"}}>
          <Header 
          handleNavigate={(section) => {
            console.log(section)
            if(section == "showcase") {
              window.scrollTo({behavior: "smooth", top: ShowcaseSectionRef.current.offsetTop * 0.5})
            } 
            
            if(section == "about") {
              window.scrollTo({behavior: "smooth", top: AboutSectionRef.current.offsetTop * 0.5})
            }

            if(section == 'cases') {
              window.scrollTo({behavior: "smooth", top: CaseStudiesRef.current.offsetTop * 0.5})
            }

            if(section == "contact") {
              window.scrollTo({behavior: "smooth", top: ContactSectionRef.current.offsetTop * 0.5})
            }

          }}
          horizontalPadding="6%" />
        </div>

        <div className="" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center"}}>
          <h1 style={{color: "#fff", fontSize: 39}}>Finn,</h1>
          <h1 style={{color: "#6E8991", fontSize: 39}}>Film director</h1>
          <h5 style={{color: "#fff", marginTop: 20}}>*Scroll down</h5>
        </div>
      </section>
      <section ref={ShowcaseSectionRef} id="showcase" style={{height: "100%", width: "100%", scrollSnapAlign: "center", backgroundColor: "#0F0F0F"}}>
        {showcase && 
          <ShowcaseSection
          data={showcase['showcase_items']}
          ></ShowcaseSection>
        }
      </section>
      <section ref={AboutSectionRef} id="about" style={{width: "100%", scrollSnapAlign: "center", backgroundColor: "#0F0F0F"}}>
        <AboutSection></AboutSection>
      </section>
      <section ref={CaseStudiesRef} id="cases" style={{width: "100%", scrollSnapAlign: "center", backgroundColor: "#0F0F0F", display: "none"}}>
        <CaseStudies></CaseStudies>
      </section>
      <section ref={ContactSectionRef} id="contact"  style={{width: "100%", scrollSnapAlign: "center", backgroundColor: "#0F0F0F"}}>
        <ContactSection>
        </ContactSection>
      </section>
    </div>
    </div>
    </>
  );
}


function ShowcaseSection({data}) {
  let length;
  const videoRef = useRef();
  const progressBarRef = useRef();

  if(data) {
    length = data.length;
  }

  const size = useWindowSize()

  const [currentPlaying, setCurrentPlaying] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState();

  const refContainer = useRef();
  const cursorRef = useRef();

  const [CursorIsPointing, setCursorIsPointer] = useState(false);

  function mouseEnters() {
    setCursorIsPointer(true);
  }

  function mouseLeaves() {
    setCursorIsPointer(false);
  }



  useEffect(() => {
    console.log(data)
  }, [])

  useEffect(() => {
    console.log(currentPlaying)
  }, [currentPlaying])

  useEffect(() => {
    calculateProgress({currentTime: currentTime, duration: duration})
  }, [currentTime])

  function calculateProgress({currentTime, duration}) {
    let value = (100 * currentTime) / duration;
    // document.getElementById('progressbar').style.width = `${value}%`;
    // progressBarRef.current.style.width = `${value}%`;

    if(progressBarRef.current) {
      progressBarRef.current.style.width = `${value}%`;
    }

    // console.log('progress ' + value)
  }




  useEffect(() => {
    document.addEventListener('mousemove', (event) => {
      // var bounds = refContainer.current.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      // console.log(mouseX, mouseY)
      // cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
    })
  }, [])

  // <div  style={{height: '1.3px', width: `${size.width / 7}px`, backgroundColor: "#454545"}}></div>
 //  <div style={{height: '1.3px', width: "50px", backgroundColor: "#fff", marginTop: "-1.7px"}}></div>

  if(!data) {
    return(<div>

    </div>)
  }

  if(size.width < 400) {
    return(
      <div ref={refContainer} style={{position: "relative", height: "100%", width: "100%"}}>
      <div style={{paddingLeft: "6%", paddingRight: "6%"}}>
        <div style={{ position: "absolute", zIndex: 100, display: "flex", height: "60%", justifyContent: "space-between", flexDirection: "column"}}>
          {data && data.map((items, index) => (
            <div key={index} style={{color: "#fff", paddingRight: 40, marginTop: 30, width: `${size.width / 3}px` }}>
              <div onClick={() => {
                setCurrentPlaying(index)
              }} style={{paddingTop: 10, cursor: "pointer", width: "160px"}}>
                {currentPlaying === index ?
                <div style={{width: `${size.width / 3}px`, backgroundColor: "#010a13", height: 1.3, marginBottom: "17px", opacity: "100%"}}>
                  <div ref={progressBarRef} style={{width: `0%`, backgroundColor: "#fff", height: 1.3, marginTop: "0px", transition: "transform .1s linear"}}>
                  </div>
                </div> : 
                <div style={{width: `${size.width / 3}px`, backgroundColor: "#010a13", height: 1.3, marginBottom: "17px"}}>
                </div>
                }
                <a 
                className="animated animatedFadeInUp fadeInUp"
                onMouseEnter={mouseEnters} 
                onMouseLeave={mouseLeaves}
                style={{marginTop: "40px", color: "#fff"}}>
                  <h5 style={{ fontSize: 19, fontFamily: "GT-MED", fontWeight: 500}}>{items.titel}</h5>
                  <h5 style={{fontFamily: "Poppins", fontWeight: 500, marginTop: 6, fontSize: 14}}>Zalando</h5>
                </a>
              </div>
            </div>
          ))}
          </div>
        </div>

        <div  
        onClick={() => {
          let id = data[currentPlaying]['_id']
          let url = `/showcase/${id}`
          window.location.href = url;
        }}
        style={{display: "flex", position: "absolute", zIndex: 100, bottom: 30,  cursor: "pointer", paddingLeft: "6%", paddingRight: "6%"}}>
            <a  onMouseEnter={mouseEnters} onMouseLeave={mouseLeaves} style={{marginTop: "40px", color: "#fff"}}>
              {data[currentPlaying] && 
              <>
                <div style={{display: "flex", alignItems: "center",  marginTop: 20, justifyContent: "space-between"}}>
                  <div style={{display: "flex", alignItems: "center"}}>
                    <h5 style={{fontFamily: "Poppins", fontSize: 16, fontWeight: 400, color: "#fff", marginRight: 20}}>WATCH THE FILM</h5>
                    <img height={30} src="./play-icon.png"></img>
                  </div>
                </div>
              </>
              }
            </a>
        </div>
        <video 
        ref={videoRef}
        onLoadedMetadata={(e) => {
          // console.log("duration" + e.target.duration)
          setDuration(e.target.duration)
        }}
        width="100%" 
        src={data[currentPlaying]['video']['url']} 
        autoPlay muted 
        height={size.height} 
        style={{backgroundColor: "#000", opacity: "80%", objectFit: "cover", zIndex: 1000}}
        onEndedCapture={() => {
          if(currentPlaying < (length - 1)) {
            setCurrentPlaying(currentPlaying + 1)
          } else {
            // console.log(' terug naar het begin dan')
            setCurrentPlaying(currentPlaying - length + 1)
            videoRef.current.play()
            // setCurrentPlaying(currentPlaying - length)
          }


        }}
        onTimeUpdateCapture={(e) => {
          // console.log("current time" + e['target']['currentTime'])
          setCurrentTime(e['target']['currentTime'])
        }}
        >
        </video>
    </div>
    )
  }

  return(
    <div ref={refContainer} style={{position: "relative", height: "100%", width: "100%"}}>
      <div style={{paddingLeft: "6%", paddingRight: "6%"}}>
        <div style={{display: "flex", position: "absolute", zIndex: 100}}>
          {data && data.map((items, index) => (
            <div key={index} style={{color: "#fff", paddingRight: 40, marginTop: 30, width: `${size.width / 7}px` }}>
              <div onClick={() => {
                setCurrentPlaying(index)
              }} style={{paddingTop: 10, cursor: "pointer"}}>
                {currentPlaying === index ?
                <div style={{width: `${size.width / 7}px`, backgroundColor: "#010a13", height: 1.3, marginBottom: "17px", opacity: "100%"}}>
                  <div ref={progressBarRef} style={{width: `0%`, backgroundColor: "#fff", height: 1.3, marginTop: "0px", transition: "transform .1s linear"}}>
                  </div>
                </div> : 
                <div style={{width: `${size.width / 7}px`, backgroundColor: "#010a13", height: 1.3, marginBottom: "17px"}}>
                </div>
                }
                <a 
                className="animated animatedFadeInUp fadeInUp"
                onMouseEnter={mouseEnters} 
                onMouseLeave={mouseLeaves}
                style={{marginTop: "40px", color: "#fff"}}>
                  <h5 style={{ fontSize: 19, fontFamily: "GT-MED", fontWeight: 500}}>{items.titel}</h5>
                  <h5 style={{fontFamily: "Poppins", fontWeight: 500, marginTop: 6, fontSize: 14}}>Zalando</h5>
                </a>
              </div>
            </div>
          ))}
          </div>
        </div>

        <div  
        onClick={() => {
          let id = data[currentPlaying]['_id']
          let url = `/showcase/${id}`
          window.location.href = url;
        }}
        style={{display: "flex", position: "absolute", zIndex: 100, bottom: 90, right: 120, width: "45%", maxWidth: "700px", minWidth: "400px", cursor: "pointer"}}>
            <a  onMouseEnter={mouseEnters} onMouseLeave={mouseLeaves} style={{marginTop: "40px", color: "#fff"}}>
              {data[currentPlaying] && 
              <>
                <h5 style={{ fontSize: 23, color: "#fff", fontFamily: "Poppins", fontWeight: 400}}>{data[currentPlaying]['beschrijving']}</h5>
                <div style={{display: "flex", alignItems: "center",  marginTop: 20, justifyContent: "space-between"}}>
                  <div style={{display: "flex", alignItems: "center"}}>
                    <h5 style={{fontFamily: "GT-MED", fontWeight: 500, marginTop: 6, fontSize: 16, color: "#fff"}}>{data[currentPlaying]['titel']}</h5>
                    <h5 style={{fontFamily: "Poppins", fontWeight: 400, marginTop: 6, fontSize: 16, color: "#fff", marginLeft: 40}}>Persoonlijk</h5>
                  </div>
                  <div style={{display: "flex", alignItems: "center"}}>
                    <h5 style={{fontFamily: "Poppins", fontSize: 16, fontWeight: 400, color: "#fff", marginRight: 20}}>WATCH THE FILM</h5>
                    <img height={30} src="./play-icon.png"></img>
                  </div>
                </div>
              </>
              }
            </a>
        </div>
        <video 
        ref={videoRef}
        onLoadedMetadata={(e) => {
          // console.log("duration" + e.target.duration)
          setDuration(e.target.duration)
        }}
        width="100%" 
        src={data[currentPlaying]['video']['url']} 
        muted={true} 
        autoPlay={true}
        height={size.height} 
        style={{backgroundColor: "#000", opacity: "80%", objectFit: "cover", zIndex: 1000}}
        onEndedCapture={() => {
          if(currentPlaying < (length - 1)) {
            setCurrentPlaying(currentPlaying + 1)
          } else {
            // console.log(' terug naar het begin dan')
            setCurrentPlaying(currentPlaying - length + 1)
            videoRef.current.play()
            // setCurrentPlaying(currentPlaying - length)
          }


        }}
        onTimeUpdateCapture={(e) => {
          // console.log("current time" + e['target']['currentTime'])
          setCurrentTime(e['target']['currentTime'])
        }}
        >
        </video>
    </div>
  )
}




function AboutSection() {
  const {about, loading} = useAbout();

  const containerRef = useRef();

  useEffect(() => {
    if(!loading) {
      console.log(loading)
      console.log(about)
    }
  }, [loading])


  if(loading) {
    return(
      <div>
        <h5>Loading</h5>
      </div>
    )
  }

  return(
    <div onMouseEnter={() => {
      
    }} ref={containerRef} style={{height: "100%", width: "100%", pointerEvents: "initial", paddingBottom: "100px"}}>
      <div style={{margin: "auto", width: "50%", minWidth: "300px", maxWidth: "600px"}}>
        <h4 style={{textAlign: "center", color: "#fff", fontSize: 40, paddingTop: 160}}>About me</h4>
        <Fade left>
        <div style={{paddingTop: 40}}>
          <p style={{width: "85%", color: "#cfcbca", fontFamily: "Poppins", fontWeight: 400, margin: "auto", fontSize: "15.5px", lineHeight: "29px"}}>{about['Introductie']}</p>
        </div>
        </Fade>
        <Fade left>
          <img width="90%" style={{margin: "auto", display: "flex", marginTop: "80px", borderRadius: 10, objectFit: "cover", height: "300px", maxHeight: "100%"}} src={about['Foto']['url']}></img>
        </Fade>
        <Fade bottom>
        <div style={{paddingTop: 100}}>
          {about['Text_space_a'] && <p style={{width: "85%", color: "#cfcbca", fontFamily: "Poppins", fontWeight: 400, margin: "auto", fontSize: "15.5px", lineHeight: "29px"}}>{about['Text_space_a']}</p>}
        </div>
        </Fade>
        <Fade bottom>
          <div style={{paddingTop: 50}}>
          {about['Text_space_b'] && <p style={{width: "85%", color: "#cfcbca", fontFamily: "Poppins", fontWeight: 400, margin: "auto", fontSize: "15.5px", lineHeight: "29px"}}>{about['Text_space_b']}</p>}
          </div>
        </Fade>
        <div>
          <h4 style={{textAlign: "center", color: "#6E8991", fontSize: 30, paddingTop: 90}}>Want to know more?</h4>
        </div>
        <Fade bottom>
        <div style={{textAlign: "center", padding: "10px 10px", borderRadius: 7, border: "1px solid #484848", display: "block", width: "130px", margin: "auto", marginTop: 25}}>
          <h5 style={{fontSize: 15, color: "#fff", fontFamily: "Poppins", fontWeight: 500}}>Download Bio</h5>
        </div>
        </Fade>
      </div>
    </div>
  )
}

function CaseStudies() {
  return(
    <div style={{height: "100%", width: "100%", pointerEvents: "initial", paddingBottom: "100px", paddingTop: "100px"}}>
      <div>
        <Fade bottom>
        <h4 style={{textAlign: "center", color: "#fff", fontSize: 40, paddingTop: 160}}>Case studies</h4>
        </Fade>
      </div>
      <div style={{margin: "auto", width: "80%", minWidth: "300px", maxWidth: "1000px", paddingTop: 40}}>
        <Fade bottom>
        <div style={{position: "relative", height: "500px", width: "100%"}}>
          <div id="hover-zoom" style={{overflow: "hidden", height: "100%"}}>
            <img  style={{width: "100%",  height: "100%", objectFit: "cover", zIndex: "-1"}} src="https://finn-vanden-ijssel-storage.s3.eu-west-2.amazonaws.com/810594955_0f3087d885"></img>
          </div>
          <div style={{alignItems: "center", color: "#fff", position: "absolute", left: "0%", right: "0%", top: "0%", bottom: "0%", display: "flex", justifyContent: "center"}}>
            <div style={{textAlign: "center"}}>
              <h3 style={{fontSize: 40}}>Hebbes</h3>
              <h5 style={{marginTop: 15}}>SEE CASE STUDY</h5>
            </div>
          </div>
        </div>
        </Fade>
        <Fade bottom>
        <div style={{position: "relative", height: "500px", width: "100%", marginTop: 40}}>
          <div id="hover-zoom" style={{overflow: "hidden", height: "100%"}}>
            <img  style={{width: "100%",  height: "100%", objectFit: "cover", zIndex: "-1"}} src="https://finn-vanden-ijssel-storage.s3.eu-west-2.amazonaws.com/763287409_b2a98a1a2f"></img>
          </div>
          <div style={{alignItems: "center", color: "#fff", position: "absolute", left: "0%", right: "0%", top: "0%", bottom: "0%", display: "flex", justifyContent: "center"}}>
            <div style={{textAlign: "center"}}>
              <h3 style={{fontSize: 40}}>Hebbes</h3>
              <h5 style={{marginTop: 15}}>SEE CASE STUDY</h5>
            </div>
          </div>
        </div>
        </Fade>
        <Fade bottom>
        <div style={{position: "relative", height: "500px", width: "100%", marginTop: 40}}>
          <div id="hover-zoom" style={{overflow: "hidden", height: "100%"}}>
            <img  style={{width: "100%",  height: "100%", objectFit: "cover", zIndex: "-1"}} src="https://finn-vanden-ijssel-storage.s3.eu-west-2.amazonaws.com/996671703_6ce92b1776"></img>
          </div>
          <div style={{alignItems: "center", color: "#fff", position: "absolute", left: "0%", right: "0%", top: "0%", bottom: "0%", display: "flex", justifyContent: "center"}}>
            <div style={{textAlign: "center"}}>
              <h3 style={{fontSize: 40}}>Hebbes</h3>
              <h5 style={{marginTop: 15}}>SEE CASE STUDY</h5>
            </div>
          </div>
        </div>
        </Fade>
      </div>
    </div>
  )
}

function ContactSection() {
  return(
    <div style={{height: "100%", width: "100%", pointerEvents: "initial", paddingBottom: "100px", paddingTop: "100px"}}>
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
  )
}



export default Home;
