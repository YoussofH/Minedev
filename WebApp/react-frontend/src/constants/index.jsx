import { PiDotsThreeFill } from "react-icons/pi";
import { PiWaves } from "react-icons/pi";
import { TbBulb } from "react-icons/tb";

//import heroImage from "../assets/heroImage.jpg";
import feature1Image from "../assets/feature1Image.png";
import feature2Image from "../assets/feature1Image.png";
import feature3Image from "../assets/feature1Image.png";

export const navItems = [
    { label: "About", route: "#about" },
    { label: "Features", route: "#features" },
    { label: "Pricing", route: "#pricing" },
    { label: "Speech API", route: "voicePage" },
];

export const features = [
    {
        icon: <PiWaves size={22}/>,
        tagText: "Easy-breezy",
        title: "Get a high level overview when working in an unfamiliar codebase",
        image: feature1Image,
        description:
            "Surface internal libraries and existing patterns. This helps prevent stale code, dependency bloat and frees up time to work on unsolved problems.",
    },
    {
        icon: <TbBulb size={22}/>,
        tagText: "Right Choice",
        title: "Answer the most challenging technical questions",
        image: feature2Image,
        description:
            "Minedev gives you the ability to share thoughts and talk to the AI using our Microphone API.",
    },
    {
        icon: <PiDotsThreeFill size={22}/>,
        tagText: "Smart Prompts",
        title: "Generate code using your existing codebase as context",
        image: feature3Image,
        description:
            "Choose files from your codebase, write a prompt and generate patches, scripts and tests. Minedev is one of the most powerful ways to write code using AI, featuring dependency resolution, line-level granularity of context and templating.",
    },
];

export const pricingOptions = [
    {
        class: "",
        title: "Free",
        price: "$0",
        tip: "Affordable and Essential",
        features: [
            "Chatbot",
            "2,048 Token Context",
            "Web Analytics",
            "Public Mode",
        ],
    },
    {
        class: "",
        title: "Pro",
        price: "$10",
        tip: "Flexible and Scalable",
        features: [
            "Chatbot",
            "Speech API",
            "4,096 Token Context",
            "Private Mode",
        ],
    },
    {
        class: "lg:md:col-span-1 md:col-span-2",
        title: "Enterprise",
        price: "$200",
        tip: "Business Oriented",
        features: [
            "Define System Responses",
            "Unlimited Token Context",
            "Unlimited Storage",
            "Manage Enterprise Users",
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