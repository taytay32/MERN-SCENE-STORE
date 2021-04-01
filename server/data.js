import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Taylor",
      email: "admin@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },

    {
      name: "John",
      email: "user@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      type: "apparel",
      name: "Crow Hoodie",
      category: "Hoodies",
      image: "/images/merch/hoodie_edit-1.png",
      imageDetail: "/images/merch/hoodie-pam-removebg.png",
      price: 35,
      countInStock: 60,
      sizes: ["S", "M", "L", "XL"],
      //   small: 13,
      //   medium: 13,
      //   large: 13,
      //   xlarge: 23
      // }
      description: "Stylish, flexible, and warm!",
    },
    {
      type: "apparel",
      name: "Horse Tee",
      category: "Tees",
      image: "/images/merch/tee_edit.jpg",
      imageDetail: "/images/merch/tee-primz-removebg.png",
      price: 20,
      countInStock: 5,
      sizes: ["S", "M", "L", "XL"],
      // countInStock = {
      //   small: 13,
      //   medium: 13,
      //   large: 13,
      //   xlarge: 23
      // }
      description: "Standard emo t-shirt, for you.",
    },
    {
      type: "apparel",
      name: "Dear Hair Tank",
      category: "Tanks",
      image: "/images/merch/tank_edit-bg.png",
      imageDetail: "/images/merch/tank-pam-removebg.png",
      price: 25,
      countInStock: 12,
      sizes: ["S", "M", "L", "XL"],
      // countInStock = {
      //   small: 13,
      //   medium: 13,
      //   large: 13,
      //   xlarge: 23
      // }
      description: "Oh what a day",
    },
    {
      type: "music",
      name: "CD - Autophage",
      category: "CD",
      image: "/images/merch/cd-auto-front.jpeg",
      imageDetail: "/images/merch/auto-cd-full-2.png",
      price: 5,
      countInStock: 10,
      // description:
      //   "GURTH's debut EP in a low profile slip case, artwork by Geoff Watson.",
      releaseDate: "Mar 31, 2018",
      artwork: "Artwork by Geoff Watson",

      trackList: ["1. Dear Hair", "2. Caskets", "3. Trappist", "4. Breathe"],
      trackLength: ["(4:26)", "(4:52)", "(5:23)", "(3:44)"],
    },

    {
      type: "music",
      name: "CD - A Better End",
      category: "CD",
      image: "/images/merch/cd-abe-front.jpeg",
      imageDetail: "/images/merch/cd-abe-full.png",
      price: 5,
      countInStock: 20,

      // description:
      //   "GURTH's sophomore EP in low profile slip case, artwork by Gabe Altrows.",
      //artwork: "Artwork by Gabe Altrows."
      releaseDate: "Oct 19, 2019",
      trackList: [
        "1. Concluding",
        "2. Young Punk",
        "3. The Great Grey Yawning",
      ],
      trackLength: ["(4:29)", "(5:02)", "(6:15)"],
    },
    {
      type: "music",
      name: `7" Vinyl`,
      category: "Vinyl",
      image: "/images/merch/vinyls.png",
      imageDetail: "/images/merch/vinyls.png",
      price: 15,
      countInStock: 30,
      // description: "high quality product",
      releaseDate: "Oct 19, 2019",
      trackList: ["Side A: Concluding", "Side B: Dear Hair"],
      trackLength: ["(4:29)", "(4:26)"],
    },
    {
      type: "button",
      name: "Sons Btn",
      category: "buttons",
      image: "/images/merch/logo-hockey-puck.png",
      imageDetail: "/images/merch/logo-hockey-puck.png",
      price: 1,
      countInStock: 30,
      description: "For styling up your denim jacket",
    },
    {
      type: "tab",
      name: "Autophage Tab",
      category: "digital download",
      image: "/images/merch/tab-auto.png",
      imageDetail: "/images/merch/tab-auto.png",
      price: 5,

      description:
        "Full digital tab transcription (GP 7) of Autophage EP, including drums, bass, and guitars.  Link to downloadable zip file provided.",
    },
    {
      type: "tab",
      name: "A Better End Tab",
      category: "digital download",
      image: "/images/merch/tab-abe.png",
      imageDetail: "/images/merch/tab-abe.png",
      price: 5,
      description:
        "Full digital tab transcription (GP 7) of A Better End EP, including drums, bass, and guitars.   Link to downloadable zip file provided.",
    },
  ],
};

export default data;
