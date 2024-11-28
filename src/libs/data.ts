export type ProjectData = {
    name: string;
    link: string;
    photo: string;
    description: string;
    tags: string[];
    created_at: Date,
    stack: string[];
    size: number,
}

// export const getAllTags = (): String[] => {
//     return [...Array.from(new Set<String>(allProjects.map((a) => a.tags).flat()))]
// }

// export const allProjects: ProjectData[] = [
//     {
//         name: 'PldMaker',
//         link: 'https://github.com/frnikho/PldMaker',
//         created_at: new Date('2022-07-01'),
//         description: 'PLD Maker est un SaaS qui aide ses utilisateurs à gérer leurs projets en générant des fichiers de suivi au format PDF entièrement personnalisables. L’outil propose des fonctionnalités adaptées pour répondre à différents besoins de suivi et de gestion',
//         photo: '/projects/pld_1.png',
//         tags: ['Web', 'Api'],
//         stack: ['Docker', 'NestJS', 'React'],
//     },
//     {
//         name: 'ATrip',
//         description: 'Trip Planner est une application web conçue avec Next.js et un backend en microservices sous NestJS, pour une planification de voyages efficace et performante.\n\nLe projet a débuté avec un prototype Figma, permettant de définir précisément les besoins des utilisateurs avant le développement. Cette approche centrée sur l\'utilisateur garantit une solution robuste et adaptée.',
//         link: '',
//         created_at: new Date('2023-09-01'),
//         photo: '/projects/trip_planner.png',
//         stack: ['NestJS', 'NextJS'],
//         tags: ['Web', 'Api']
//     },
//     {
//         name: 'fbx-cli',
//         description: 'fbx-cli est un outil en ligne de commande (CLI) permettant de contrôler et gérer une Freebox à distance. Il offre une interface simple et efficace pour interagir avec la Freebox sans avoir à passer par l\'interface web.',
//         link: 'https://github.com/frnikho/fbx-cli',
//         tags: ['CLI'],
//         stack: ['Rust'],
//         photo: '/projects/fbx-cli.png',
//         created_at: new Date('2024-02-01')
//     },
//     {
//         name: 'IOTSensorSensei',
//         description: 'IOTSensorSensei est un projet d\'école visant à collecter des données depuis des capteurs sur un ESP32, les transmettre via LoRa, les récupérer sur un autre ESP32 et les envoyer à une API pour visualisation.',
//         link: '',
//         stack: ['C++', 'C', 'Rust'],
//         tags: ['IoT', 'Api'],
//         photo: '/projects/iot_sensor.png',
//         created_at: new Date('2024-06-01')
//     },
//     {
//         name: 'T-Cloud',
//         description: 'T-Cloud est un projet d\'école consistant à mettre en place un cluster Kubernetes bare metal avec trois nœuds, en intégrant des pratiques d\'IaaS, DevOps et GitOps.',
//         link: '',
//         tags: ['DevOps'],
//         stack: ['Kubernetes', 'Docker', 'Terraform', 'Grafana', 'Ansible'],
//         photo: '/bg.png',
//         created_at: new Date('2024-04-01')
//     },
//     {
//         name: 'ARGames',
//         description: 'ARGames est un projet de fin d\'étude visant à créer un jeu en réalité augmentée, où des ESP32 activent des mécanismes (lumière, son, tiroir) pour faire progresser le joueur sur mobile ou tablette',
//         link: '',
//         created_at: new Date('2023-01-01'),
//         photo: '/projects/argames.png',
//         stack: ['Unity', 'C#', 'C++', 'C'],
//         tags: ['Game', 'IoT']
//     },
//     {
//         name: 'MyRPG',
//         link: 'https://github.com/frnikho/Epitech_rpg',
//         description: 'MyRPG est un projet de première année à Epitech, consistant à créer un jeu RPG en C, en utilisant uniquement la bibliothèque CSFM',
//         stack: ['C'],
//         tags: ['Game'],
//         photo: '/projects/my_rpg.png',
//         created_at: new Date('2019-06-01')
//     },
// ];