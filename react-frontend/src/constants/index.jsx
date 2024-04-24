import { RiSparkling2Fill } from "react-icons/ri";
import { PiDotsThreeFill } from "react-icons/pi";
import { PiWaves } from "react-icons/pi";
import { TbBulb } from "react-icons/tb";
import { FaAsterisk } from "react-icons/fa6";
import { PiStarFour } from "react-icons/pi";
import { MdArrowOutward } from "react-icons/md";

import heroImage from "../assets/profile-pictures/heroImage.jpg";
import feature1Image from "../assets/profile-pictures/feature1Image.jpg";
import feature2Image from "../assets/profile-pictures/feature2Image.jpg";
import feature3Image from "../assets/profile-pictures/feature3Image.jpg";

export const navItems = [
    { label: "About", href: "#" },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
];

export const features = [
    {
        icon: <PiDotsThreeFill />,
        tagText: "Smart Prompts",
        title: "Easy Integration, Effortless Execution",
        image: feature1Image,
        description:
            "Transform web tasks with our AI-powered toolkit. Create browser automations as intutively as writing a simple prompt. We'll take care of the code for you.",
    },
    {
        icon: <PiWaves />,
        tagText: "Easy-breezy",
        title: "Say Goodbye to Selectors",
        image: feature2Image,
        description:
            "Unlike traditional methods that falter when sites change, our intelligent platform dynamically adjusts, ensuring your automation continues uninterrupted.",
    },
    {
        icon: <TbBulb />,
        tagText: "Right Choice",
        title: "You Chose the Right Solution",
        iimage: feature3Image,
        description:
            "No more face hours of debugging a bunch of copy and pasted code blocks that you do not know how they function deep inside.",
    },
];

export const pricingOptions = [
    {
        title: "Free",
        price: "$0",
        features: [
            "Private board sharing",
            "5 Gb Storage",
            "Web Analytics",
            "Private Mode",
        ],
    },
    {
        title: "Pro",
        price: "$10",
        features: [
            "Private board sharing",
            "10 Gb Storage",
            "Web Analytics (Advance)",
            "Private Mode",
        ],
    },
    {
        title: "Enterprise",
        price: "$200",
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