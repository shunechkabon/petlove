import PetBlock from "../../components/PetBlock/PetBlock";
import AddPetForm from "../../components/AddPetForm/AddPetForm";
import Title from "../../components/Title/Title";
import dogImg from "../../assets/images/petblock-dog2.png";
import s from "./AddPetPage.module.css";

const AddPetPage = () => {
    return (
        <section>
            <div className={s.container}>
                <PetBlock
                    image={dogImg}
                    imgClassName={s.dogImg}
                    className={s.petBlock}
                    alt="Dog"
                    showCard={false}
                />

                <div className={s.formContainer}>
                    <div className={s.titleWrap}>
                        <Title className={s.title}>Add my pet /</Title>
                        <span className={s.text}>Personal details</span>
                    </div>
    
                    <AddPetForm />
                </div>
            </div>
        </section>
    );
};

export default AddPetPage;
