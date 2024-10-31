export type ProjectData = {
    name: string;
    link: string;
    photo: string;
    description: string;
    tags: string[];
    created_at: Date,
    stack: string[];
}

export const getAllTags = (): String[] => {
    return ['All', ...Array.from(new Set<String>(allProjects.map((a) => a.tags).flat()))]
}

export const allProjects: ProjectData[] = [
    {
        name: 'PldMaker',
        link: 'https://github.com/frnikho/PldMaker',
        created_at: new Date('2022-07-01'),
        description: 'PldMaker est un side project realisé dans le but d\'auto-générer des documents de suivi de projets pour les EIP Epitech.',
        photo: '/projects/pld_1.png',
        tags: ['Web', 'Api'],
        stack: ['Docker', 'NestJS', 'React'],
    },
    {
        name: 'Trip planner',
        description: 'Trip planner est un projet web qui a pour but de développer une web app pour planifier un trajet',
        link: '',
        created_at: new Date('2023-09-01'),
        photo: '/projects/trip_planner.png',
        stack: ['NestJS', 'NextJS'],
        tags: ['Web', 'Api']
    },
    {
        name: 'fbx-cli',
        description: 'fbx-cli est un outils pour gérer sa freebox depuis son terminal',
        link: 'https://github.com/frnikho/fbx-cli',
        tags: ['CLI'],
        stack: ['Rust'],
        photo: '/projects/fbx-cli.png',
        created_at: new Date('2024-02-01')
    },
    {
        name: 'IOTSensorSensei',
        description: 'IOTSensorSensei est un projet d\'école qui a pour but de collecter des données depuis des capteurs sur un esp32, de transmettre ces données via la communication LoRa, de récupérer ces données sur un autre esp32 et de les envoyés sur une api pour ensuite les visualiser',
        link: '',
        stack: ['C++', 'C', 'Rust'],
        tags: ['IoT', 'Api'],
        photo: '/projects/iot_sensor.png',
        created_at: new Date('2024-06-01')
    },
    {
        name: 'T-Cloud',
        description: 'T-Cloud est un projet d\'école qui a pour but de monter sois-même un cluster kube bare metal avec 3 noeuds, avec de l\'IaS, du DevOps et du GitOps',
        link: '',
        tags: ['DevOps'],
        stack: ['Kubernetes', 'Docker', 'Terraform', 'Grafana', 'Ansible'],
        photo: '/bg.png',
        created_at: new Date('2024-04-01')
    },
    {
        name: 'ARGames',
        description: '',
        link: '',
        created_at: new Date('2023-01-01'),
        photo: '/projects/argames.png',
        stack: ['Unity', 'C#', 'C++', 'C'],
        tags: ['Game', 'IoT']
    },
    {
        name: 'MyRPG',
        link: 'https://github.com/frnikho/Epitech_rpg',
        description: 'MyRPG est un projet Epitech de premère année qui a pour but de créer un RPG en C avec comme seul librairie la CSFM',
        stack: ['C'],
        tags: ['Game'],
        photo: '/projects/my_rpg.png',
        created_at: new Date('2019-06-01')
    },
];