import React from "react";
import '../../assets/css/announcements.css'
import '../../assets/css/normalize.scss'
export default class Announcement extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <>
                    <div className={"normalizecss"}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", marginTop: "30px"}}>
                            <div className="home__bg">
                                <div className="home useFont" style={{pointerEvents: "auto"}}>
                                    <div className="home__main">

                                        <div className="home__header-wrap">
                                            <div className="home__header">

                                                <ul className="home__tabs">
                                                    <li data-index="0" className="home__tab home__tab--active">
                                                        <p data-index="0" className="home__tab-text">Game</p>
                                                    </li>
                                                    <li data-index="1" className="home__tab">
                                                        <p data-index="1" className="home__tab-text">Event</p>
                                                    </li>
                                                </ul>

                                                <button className="home__close"></button>
                                            </div>
                                        </div>

                                        <div className="home__content">

                                            <div className="home__menu-wrap">
                                                <ul className="home__menu home__swiper noScrollBar">
                                                    <li className="home__slide-seat" style={{height: "1px"}}></li>
                                                    <li className="home__slide">
                                                        <div className="home__menu-item home__menu-item--active">
                                                            <img src="https://sdk.hoyoverse.com/upload/announcement/2020/03/05/a2588f1a51faee9fa8dfe9aead649dd6_7237021399135895303.png" draggable="false" className="home__tag" alt={""}/>
                                                            <div className="home__intro home__intro--active"><p>First element
                                                                (active)</p></div>
                                                            <div data-index="0" className="home__intro--click"></div>
                                                        </div>
                                                    </li>
                                                    <li className="home__slide">
                                                        <div className="home__menu-item">
                                                            <img src="https://sdk.hoyoverse.com/upload/announcement/2020/03/05/a2588f1a51faee9fa8dfe9aead649dd6_7237021399135895303.png" draggable="false" className="home__tag" alt={""}/>
                                                            <div className="home__intro"><p>Second element</p></div>
                                                            <div data-index="1" className="home__intro--click"></div>
                                                        </div>
                                                    </li>
                                                    <li className="home__slide">
                                                        <div className="home__menu-item">
                                                            <img src="https://sdk.hoyoverse.com/upload/announcement/2020/03/05/a2588f1a51faee9fa8dfe9aead649dd6_7237021399135895303.png" draggable="false" className="home__tag" alt={""}/>
                                                            <div className="home__intro"><p>Third element</p></div>
                                                            <div data-index="2" className="home__intro--click"></div>
                                                        </div>
                                                    </li>
                                                    <li className="home__slide-seat" style={{height: "1px"}}></li>
                                                </ul>
                                            </div>

                                            <div className="home__right">
                                                <div className="home__article-wrap">
                                                    <div className="home__article">

                                                        <h1 className="home__title">Version 3.7 "Duel! The Summoners' Summit!" New
                                                            Content Overview</h1>
                                                        <div>
                                                            <p style={{whiteSpace: "pre-wrap"}}>This is example content of
                                                                announcement.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
            </>
        )
    }

    componentDidMount() {
        document.getElementsByClassName("fuckyou").item(0).remove();
        document.getElementsByTagName("html").item(0).style = "font-size: 26.985570469798656vh;"; // 160.834px
        document.getElementById("root").style = "visibility: visible;";
        document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover");

        let uniwebviewiframe = document.createElement("iframe");
        uniwebviewiframe.id = "miHoYoAnnounceIframe";
        uniwebviewiframe.style = "display: none;";
        uniwebviewiframe.src = "uniwebview://announcement_red_point?state=true&extra_state=false";
        document.getElementsByTagName('body').item(0).appendChild(uniwebviewiframe);
    }

}