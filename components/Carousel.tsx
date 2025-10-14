// import React, { Component } from "react";
// import Link from "next/link";

// interface CarouselProps {
//   featured: Array<{
//     _id: string;
//     title: string;
//     body: string;
//     imageUrl: string;
//   }>;
// }

// interface CarouselState {
//   slides: number;
//   currentCount: number;
//   intervalId?: NodeJS.Timeout;
// }

// class Carousel extends Component<CarouselProps, CarouselState> {
//   constructor(props: CarouselProps) {
//     super(props);
//     this.state = {
//       slides: props.featured.length,
//       currentCount: 1
//     };
//   }

//   componentDidMount() {
//     const intervalId = setInterval(this.timer, 6000);
//     // store intervalId in the state so it can be accessed later:
//     this.setState({ intervalId });
//   }

//   componentWillUnmount() {
//     // use intervalId from the state to clear the interval
//     if (this.state.intervalId) {
//       clearInterval(this.state.intervalId);
//     }
//   }

//   timer = () => {
//     const newCount = this.state.currentCount + 1;
//     if (newCount <= this.props.featured.length) {
//       this.setState({ currentCount: newCount });
//     } else {
//       this.setState({ currentCount: 1 });
//     }
//   };

//   render() {
//     return (
//       <div className="proto-carousel">
//         {this.props.featured.map((item, index) => {
//           return (
//             <div
//               className={`item ${
//                 index + 1 != this.state.currentCount ? "off-screen" : ""
//               }`}
//               key={index}
//               style={{ zIndex: index + 1 }}
//             >
//               <div className="overlay">
//                 <Link href={`/post?id=${item._id}`} key={index}>
//                   <a>
//                     <h2>{item.title}</h2>
//                   </a>
//                 </Link>
//                 <p>{item.body}</p>
//               </div>
//               <img src={item.imageUrl} alt="" />
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
// }
// export default Carousel;
