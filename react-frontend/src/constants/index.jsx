import { PiDotsThreeFill } from "react-icons/pi";
import { PiWaves } from "react-icons/pi";
import { TbBulb } from "react-icons/tb";

//import heroImage from "../assets/heroImage.jpg";
import feature1Image from "../assets/feature1Image.png";
import feature2Image from "../assets/feature1Image.png";
import feature3Image from "../assets/feature1Image.png";

export const navItems = [
    { label: "About", href: "#" },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
];

export const features = [
    {
        icon: <PiDotsThreeFill size={22}/>,
        tagText: "Smart Prompts",
        title: "Easy Integration, Effortless Execution",
        image: feature1Image,
        description:
            "Transform web tasks with our AI-powered toolkit. Create browser automations as intutively as writing a simple prompt. We'll take care of the code for you.",
    },
    {
        icon: <PiWaves size={22}/>,
        tagText: "Easy-breezy",
        title: "Say Goodbye to Selectors",
        image: feature2Image,
        description:
            "Unlike traditional methods that falter when sites change, our intelligent platform dynamically adjusts, ensuring your automation continues uninterrupted.",
    },
    {
        icon: <TbBulb size={22}/>,
        tagText: "Right Choice",
        title: "You Chose the Right Solution",
        image: feature3Image,
        description:
            "No more face hours of debugging a bunch of copy and pasted code blocks that you do not know how they function deep inside.",
    },
];

export const pricingOptions = [
    {
        class: "",
        title: "Free",
        price: "$0",
        tip: "Affordable and Essential",
        features: [
            "Private board sharing",
            "5 Gb Storage",
            "Web Analytics",
            "Private Mode",
        ],
    },
    {
        class: "",
        title: "Pro",
        price: "$10",
        tip: "Flexible and Scalable",
        features: [
            "Private board sharing",
            "10 Gb Storage",
            "Web Analytics (Advance)",
            "Private Mode",
        ],
    },
    {
        class: "lg:md:col-span-1 md:col-span-2",
        title: "Enterprise",
        price: "$200",
        tip: "Customized for Your Business",
        features: [
            "Private board sharing",
            "Unlimited Storage",
            "High Performance Network",
            "Private Mode",
        ],
    },
];

export const resourcesLinks = [
    { href: "#", text: "Getting Started" },
    { href: "#", text: "Documentation" },
    { href: "#", text: "Tutorials" },
    { href: "#", text: "API Reference" },
    { href: "#", text: "Community Forums" },
];

export const platformLinks = [
    { href: "#", text: "Features" },
    { href: "#", text: "Supported Devices" },
    { href: "#", text: "System Requirements" },
    { href: "#", text: "Downloads" },
    { href: "#", text: "Release Notes" },
];

export const communityLinks = [
    { href: "#", text: "Events" },
    { href: "#", text: "Meetups" },
    { href: "#", text: "Conferences" },
    { href: "#", text: "Hackathons" },
    { href: "#", text: "Jobs" },
];