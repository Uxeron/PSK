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
        user: 'User'
    },
    landingPage: {
        title: {
            text1: 'Platform to enrich your',
            text2: 'everyday life',
        },
        subtitle: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.',
        button1: 'Get started',
        button2: 'Our Github repo',
        infoSection: {
            topic: 'SUSTAINABILITY',
            title: 'A better way to share',
            subtitle: 'We want to show you just how brilliant sharing can be. Share the construction and household items that have more to give. Nexus is open to everyone who believes in sharing, connecting and reusing.',
            features: [
                {
                    name: 'Broad, community-based market',
                    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
                    icon: GlobeAltIcon
                },
                {
                    name: 'Trust based communication',
                    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
                    icon: ScaleIcon
                },
                {
                    name: 'Transparency and openiness',
                    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
                    icon: LightningBoltIcon,
                },
                {
                    name: 'Less useless consumption',
                    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
                    icon: AnnotationIcon,
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
};