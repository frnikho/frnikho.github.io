// projets à fort impact (350k utilisateurs)

export default function CTA() {
    return (
        <div className={"flex flex-row gap-0"}>
            <div className={"flex flex-col gap-8"}>
                <p>Website</p>
                <p>Mobile</p>
                <p>Creative</p>
            </div>
            <div className={"flex flex-col"}>
                <div>
                    <p>What do I help ?</p>
                    <p>Mollit duo congue ullamco enim sadipscing doming luptatum sunt nostrud duis aute, ullamco eros sunt duo nostrud excepteur invidunt ut magna ut incidunt commodi clita sed. Proident aliquip enim dolor ea nonummy te suscipit at. Est tincidunt duis. Nisi nam amet.</p>
                    <div className={"flex flex-row gap-20"}>
                        <div className={"flex flex-col gap-1"}>
                            <p className={"text-5xl font-bold font-montserrat"}>285+</p>
                            <p>Projet completed</p>
                        </div>
                        <div className={"flex flex-col gap-1"}>
                            <p className={"text-5xl font-bold font-montserrat"}>190+</p>
                            <p>Happy Clients</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}