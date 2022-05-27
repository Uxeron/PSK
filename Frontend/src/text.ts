import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from "@heroicons/react/solid";

export const t = {
    common: {
        logIn: "Log In",
        logOut: "Log Out",
    },
    navBar: {
        name: 'Nexus',
        browse: 'Browse',
        upload: 'Upload',
    },
    landingPage: {
        title: {
            text1: 'Platform to enrich your',
            text2: 'everyday life',
        },
        subtitle: 'Nexus is your platform for pre-owned items you’ll love. One community and a whole lot of easy-to-get products. Ready to get started? Join us!',
        button1: 'Get started',
        button2: 'Our Github repo',
        infoSection: {
            topic: 'SUSTAINABILITY',
            title: 'A better way to share',
            subtitle: 'We want to show you just how brilliant sharing can be. Share the construction and household items that have more to give. Nexus is open to everyone who believes in sharing, connecting and reusing.',
            features: [
                {
                    name: 'Broad, community-based market',
                    description: "It's always easier and more comfortable to work with the ones you relate to, not big some random big coorporations. Borrow to and from people just like you!",
                    icon: GlobeAltIcon
                },
                {
                    name: 'Trust based communication',
                    description: "We believe in an open community and we are not interfering into the communication of our clients. If you find an item you like - it's all up to you how you wanna handle the trade!",
                    icon: ScaleIcon
                },
                {
                    name: 'Less useless consumption',
                    description: "Why buy many items that you are not even gonna use in a month? Extra spendings, using up precious space and generally not good for the environment. Be the game changer and reuse what's still great!",
                    icon: AnnotationIcon,
                },
                {
                    name: 'Transparency and openiness',
                    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
                    icon: LightningBoltIcon,
                },
            ]
        }
    },
    browseScreen: {
        apply: 'Apply filter',
    },
    uploadScreen: {
        title: 'Upload an Item!',
        card1: {
            nameLabel: 'Name:',
            descriptionLabel: 'Description:',
            categoryLabel: 'Category:',
            tagsLabel: 'Tags:',
            conditionLabel: 'Condition:',
            toGiveAwayLabel: 'To give away:',
            locationLabel: 'Pick up location:'
        },
        card2: {
            label: 'Images:',
            input: ['Drop files to upload or', 'browse'],
        },
        submitButton: 'Upload an item'
    },
    detailsScreen: {
        title: 'Details of your item',
        editTitle: 'Edit details of your item'
    },
};