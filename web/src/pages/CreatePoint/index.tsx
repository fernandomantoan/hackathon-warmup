import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";
import logo from "../../assets/logo.svg";
import { LeafletMouseEvent } from "leaflet";
import { Map, TileLayer, Marker } from "react-leaflet";
import api from "../../services/api";
import Dropzone from "../../components/Dropzone";

interface Service {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGCityResponse {
  nome: string;
}

const CreatePoint = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    whatsapp: ''
  });
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get("services").then((response) => {
      setServices(response.data);
    });
  }, []);

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSelectItem(id) {
    const alreadySelected = selectedServices.findIndex(service => service === id);

    if (alreadySelected >= 0) {
      const filteredServices = selectedServices.filter(service => service !== id);
      setSelectedServices(filteredServices);
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const [latitude, longitude] = selectedPosition;
    const services = selectedServices;

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('services', services.join(','));
    if (selectedFile) {
      data.append('image', selectedFile);
    }

    await api.post('points', data);

    alert("Cadastrado com sucesso!");

    history.push("/");
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Estrada para Saúde" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do Ponto de Saúde</h1>
        <Dropzone onFileUploaded={setSelectedFile} />
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da Entidade</label>
            <input type="text" name="name" id="name" onChange={handleInputChange} />
          </div>
          <div className="field">
            <label htmlFor="description">Descrição</label>
            <input type="text" name="description" id="description" onChange={handleInputChange} />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" onChange={handleInputChange} />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Serviços Ofertados</h2>
            <span>Selecione um ou mais serviços abaixo</span>
          </legend>
          <ul className="items-grid">
            {services.map(service => (
              <li
                className={selectedServices.includes(service.id) ? 'selected' : ''}
                key={service.id}
                onClick={() => handleSelectItem(service.id)}>
                <img src={service.image_url} alt={service.name} />
                <span>{service.description}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de saúde</button>
      </form>
    </div>
  );
};

export default CreatePoint;
