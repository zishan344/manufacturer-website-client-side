import React from "react";
import Review from "./Review";

const Reviews = () => {
  const Reviews = [
    {
      profile:
        "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwcGFydHN8ZW58MHx8MHx8&auto=format&fit=crop&w=50",
      name: "john",
      review:
        "Ea laborum ullamco cillum nisi anim in pariatur. Proident amet velit velit ullamco reprehenderit dolor magna duis enim et magna officia culpa adipisicing. Veniam voluptate occaecat eu magna anim tempor eiusmod cillum commodo mollit id nulla. Velit id dolor Lorem aliquip anim veniam do quis nostrud ad ea",
      rating: 4.5,
    },
    {
      profile: "https://i.ibb.co/JHdYrvJ/human.jpg",
      name: "Rhon bon",
      review:
        "Ea laborum ullamco cillum nisi anim in pariatur. Proident amet velit velit ullamco reprehenderit dolor magna duis enim et magna officia culpa adipisicing. Veniam voluptate occaecat eu magna anim tempor eiusmod cillum commodo mollit id nulla. Velit id dolor Lorem aliquip anim veniam do quis nostrud ad ea",
      rating: 5,
    },
    {
      profile: "https://i.ibb.co/tbY24vY/human-2.jpg",
      name: "smith sara",
      review:
        "Ea laborum ullamco cillum nisi anim in pariatur. Proident amet velit velit ullamco reprehenderit dolor magna duis enim et magna officia culpa adipisicing. Veniam voluptate occaecat eu magna anim tempor eiusmod cillum commodo mollit id nulla. Velit id dolor Lorem aliquip anim veniam do quis nostrud ad ea",
      rating: 3.5,
    },
  ];
  return (
    <div className="my-12 container mx-auto">
      <div className="text-center">
        <h2 className="text-[#86B6F4] text-xl font-bold my-12 inline-block bg-[#E7F1FD] px-2 py-1 rounded-full">
          Testimonial Review
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
