import React, { useContext } from 'react';
import './CreateCategory.css';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormBs from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { createNewCategory, getCategory } from '../../services/axiosCategory.consig';
import { useAlert } from '../../hooks/AlertProvider/AlertProvider';
import { CategoryContext, UPLOAD_CATEGORIES } from '../../context/itemsContext';

const petSpecies = [
    "Perro",
    "Gato",
    "Pez",
    "Pájaro",
    "Conejo",
    "Hámster",
    "Cobaya",
    "Chinchilla",
    "Hurón",
    "Tortuga",
    "Serpiente",
    "Iguana",
    "Camaleón",
    "Loro",
    "Canario",
    "Periquito"
];

export default function CreateCategory({ item }) {
    const navigate = useNavigate();
    const showAlert = useAlert();
    const { dispatchCategory } = useContext(CategoryContext);

    const initialValues = {
        name: item ? item.name || '' : '',
        animal: item ? item.animal || '' : ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'nombre muy corto')
            .max(20, 'nombre muy largo')
            .required('El campo es obligatorio'),
        animal: Yup.string()
            .required('El campo es obligatorio')
    });

    const onSubmit = async (values, { resetForm }) => {
        try {
            await createNewCategory(values);
            showAlert('¡Su categoria fue registrada!', 'success');
            resetForm();
            const responseCategory = await getCategory();
            dispatchCategory({ type: UPLOAD_CATEGORIES, payload: responseCategory.data });
        } catch (error) {
            navigate('/error');
            console.error('Error al procesar la respuesta del servicio:', error);
        }
    };

    return (
        <div className={`form__category__container`}>
            <h3 className="form__category__title">Creacion de Categoria</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnMount={true}
            >
                {({ isSubmitting, isValid, errors, touched }) => (
                    <Form className="form">
                        <FormBs.Group className="form__category__group">
                            <label htmlFor='name' className="form__category__label"> Nombre de la Categoria </label>
                            <Field id='name' type='text' placeholder='Juguetes...' name='name' className="form__category__input form-control" />
                            {errors.name && touched.name && (
                                <ErrorMessage name='name' component='div' className="form__category__error"></ErrorMessage>
                            )}
                        </FormBs.Group>
                        <div className="form__category__group">
                            <FormBs.Label className="update-stock__label">Seleccionar Tipo de Mascota</FormBs.Label>
                            <Field as="select" name="animal" className="form__category__input form-control">
                                <option value="" disabled>
                                    Seleccionar tipo de mascota
                                </option>
                                {petSpecies.map(item => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </Field>
                            {errors.animal && touched.animal && (
                                <ErrorMessage name='animal' component='div' className="form__category__error"></ErrorMessage>
                            )}
                        </div>

                        <Button type='submit' className="form__category__submit btn btn-primary" disabled={isSubmitting || !isValid}> Cargar Categoria</Button>
                        {isSubmitting ? (<p className="form__category__submitting">Se envio la categoria</p>) : null}
                    </Form>
                )}
            </Formik>
        </div>
    );
}
