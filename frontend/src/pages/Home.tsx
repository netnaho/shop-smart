import React from "react";
import Ripple from "@/components/ui/ripple";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import SideNav from "@/components/ui/nav&header/SideNav";
//import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  const list = [
    {
      title: "Iphones",
      img: "https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$5.50",
    },
    {
      title: "Headsets",
      img: "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGVsZWN0cm9uaWMlMjBnYWRnZXRzfGVufDB8fDB8fHww",
      price: "$3.00",
    },
    {
      title: "NIKE",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
      price: "$10.00",
    },
    {
      title: "PS5",
      img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2FtaW5nfGVufDB8fDB8fHww",
      price: "$200.30",
    },
    {
      title: "Computer Case",
      img: "https://plus.unsplash.com/premium_photo-1671439135739-96bbe677c38c?q=80&w=1883&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$15.70",
    },
    {
      title: "Mechanical Keyboards",
      img: "https://plus.unsplash.com/premium_photo-1664194583917-b0ba07c4ce2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$8.00",
    },
    {
      title: "Clothes",
      img: "https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$7.50",
    },
    {
      title: "Books & E-Books",
      img: "https://images.unsplash.com/photo-1616687551818-a9218cddd2dc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$12.20",
    },
  ];
  return (
    <div>
      {/* hero section */}
      <div>
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-green-100 md:shadow-xl">
          <p className="z-10 whitespace-pre-wrap text-center text-7xl font-bold tracking-tighter text-slate-600">
            Shop Smart
          </p>
          <Ripple
            mainCircleOpacity={0.6}
            numCircles={30}
            mainCircleSize={310}
          />
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-semibold text-slate-600 text-center my-10">
          Products
        </h1>
        <div className="w-[90%] mx-auto">
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {list.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.title}
                    className="w-full object-cover h-[200px]"
                    src={item.img}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{item.title}</b>
                  <p className="text-default-500">{item.price}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
