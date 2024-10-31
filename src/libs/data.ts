type Project = {
    name: string;
    link: string;
    photo: string;
    description: string;
    tags: string[];
    created_at: Date,
}

export const allProjects: Project[] = [
    {
        name: 'PldMaker',
        link: 'https://github.com/frnikho/PldMaker',
        created_at: new Date('2022-07-01'),
        description: 'PldMaker est un side project realisé dans le but d\'auto-générer des documents de suivi de projets pour les EIP Epitech.',
        photo: '',
        tags: ['Typescript', 'Docker', 'NestJS', 'React']
    },
    {
        name: 'MyRPG',
        link: 'https://github.com/frnikho/Epitech_rpg',
        description: 'MyRPG est un projet Epitech de premère année qui a pour but de créer un RPG en C avec comme seul librairie la CSFM',
        tags: ['C'],
        photo: '',
        created_at: new Date('2019-06-01')
    },
    {
        name: 'fbx-cli',
        description: 'fbx-cli est un outils pour gérer sa freebox depuis son terminal',
        link: 'https://github.com/frnikho/fbx-cli',
        tags: ['Rust'],
        photo: '',
        created_at: new Date('2024-02-01')
    },
    {
        name: 'IOTSensorSensei',
        description: 'IOTSensorSensei est un projet d\'école qui a pour but de collecter des données depuis des capteurs sur un esp32, de transmettre ces données via la communication LoRa, de récupérer ces données sur un autre esp32 et de les envoyés sur une api pour ensuite les visualiser',
        link: '',
        tags: ['C++', 'C', 'Rust', 'IoT'],
        photo: '',
        created_at: new Date('2024-06-01')
    },
    {
        name: 'T-Cloud',
        description: 'T-Cloud est un projet d\'école qui a pour but de monter sois-même un cluster kube bare metal avec 3 noeuds, avec de l\'IaS, du DevOps et du GitOps',
        link: '',
        tags: ['Kubernetes', 'Docker', 'Terraform'],
        photo: '',
        created_at: new Date('2024-04-01')
    },
    {
        name: 'Trip planner',
        description: 'Trip planner est un projet web qui a pour but de développer une web app pour planifier un trajet',
        link: '',
        created_at: new Date('2023-09-01'),
        photo: '',
        tags: ['NestJS', 'NextJS']
    }
];