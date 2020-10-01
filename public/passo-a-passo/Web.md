## Construindo nosso APP

### Criando nossa GOOGLE API KEY

Documentação oficial: https://developers.google.com/places/web-service/get-api-key

1 - A chave API é um identificador exclusivo que autentica as solicitações associadas ao seu projeto para fins de uso e faturamento. Você deve ter pelo menos uma chave API associada ao seu projeto.

Para criar uma chave de API:

No Cloud Console, na página do seletor de projeto, selecione ou crie um projeto do Google Cloud para o qual deseja adicionar uma chave de API no link abaixo:
https://console.cloud.google.com/projectselector2/home/dashboard

2 - Vá para a página APIs & Services > Credentials no link abaixo:
https://console.cloud.google.com/apis/credentials

3 - Na página Credenciais, clique em Create credentials > API key. A caixa de diálogo Chave de API criada exibe sua chave de API recém-criada. 

4 - Clique em Fechar.

A nova chave de API está listada na página Credenciais em Chaves de API.
(Lembre-se de restringir a chave API antes de usá-la na produção, no link https://developers.google.com/places/web-service/get-api-key#restrict_key.)

### Criando nosso projeto

1 - Para começar, entre na pasta find-my-coffe, e vamos criar o nosso projeto com o seguinte comando:

```
npx create-react-app web
```

2 - Dentro do projeto Web, entre na pasta /src e crie a pasta '/components/GoogleMaps'.

3 - Dentro da '/src/components/GoogleMaps', crie o arquivo 'index.js'.

4 - Aqui renderizaremos nosso componente do google maps. Para isso, instale o componente digitando o comando abaixo, no terminal:

```
npm install --save google-maps-react
```

5 - Primeiro vamos criar a estrutura básica do nosso componente com o seguinte código abaixo:

```
import React, { useEffect, useState } from 'react';

const GoogleMaps = () => {
    return (
        <div className="map">

        </div>
    )
}

export default GoogleMaps;
```

6 - Agora vamos habilitar o mapa no nosso app, adicionando o seguinte:

```
...
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMaps = () => {
    const mapStyles = {        
        height: "100vh",
        width: "100%"
    };

    return (
        <div className="map">
            <LoadScript googleMapsApiKey='SUA_GOOGLE_KEY_API'>
                <GoogleMap mapContainerStyle={mapStyles}
                zoom={15}
                center={{lat: -21.7768606, lng: -41.3109657}}>
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default GoogleMaps;
```

7 - Habilitado o google maps, vamos setar nossa localização atual:

```
...

const GoogleMaps = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    ...

    useEffect(() => {
        setCurrentLocation();
    }, []);

    async function setCurrentLocation() {
        try {
            await navigator.geolocation.getCurrentPosition(function(position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        } catch (error) {
            alert('Habilite a localização para utilizar o aplicativo!');
        }
    }

    const defaultCenter = {
        lat: latitude, lng: longitude
    }

    return (
        <div className="map">
            <LoadScript googleMapsApiKey='SUA_GOOGLE_KEY_API'>
                <GoogleMap mapContainerStyle={mapStyles}
                zoom={15}
                center={defaultCenter}>
                </GoogleMap>
            </LoadScript>
    ...
```

8 - Agora crie a pasta /src/pages/HomePage.

9 - Dentro da /src/pages/HomePage, crie os arquivos 'index.js' e 'style.css'.

10 - Dentro do arquivo 'index.js', na page HomePage, escreva o seguinte código:

```
import React from 'react';
import GoogleMaps from '../../components/GoogleMaps';

import './style.css';

const HomePage = () => {
    return (
        <>
            <GoogleMaps />
        </>
    )
}

export default HomePage;
```

11 - Agora cole o seguinte código no /src/pages/HomePage/style.css:

```
.left-bar, .right-bar > * {
    background-color: rgba(10,10,10,0.9);
    padding: 20px;
}

.left-bar, .right-bar {
    width: 250px;
    z-index: 10;
    position: absolute;
    color: white;
}

hr {
    height: 1px!important;
}

.listing_stores > div {
    margin-left: -10px;
}

.MuiRating-icon svg {
    height: 20px;
    margin-left: -5px;
}

.m-top {
    margin-top: 10px;
}
```

12 - Agora vá ao arquivo /App.js e substitua pelo código abaixo, incluindo a page "HomePage":

```
import React from 'react';
import HomePage from './pages/HomePage';
import "rbx/index.css";

function App() {
  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
```

13 - Tente carregar o mapa!

14 - Mapa carregado!! Vamos avançar!

15 - Agora vamos setar nossos cafés no mapa!

16 - Antes de tudo, instale o axios colando o seguinte comando no terminal:
```
npm install axios
```

17 - Crie uma pasta '/src/services'.

18 - Dentro essa pasta, crie os arquivos api.js e google_list_of_establishments.js.

19 - Cole o código abaixo no arquivo api.js:

```
import axios from 'axios';

const Api = axios.create({baseURL: 'http://localhost:3001/api/v1'});

export default Api;
```

20 - Agora navegue no arquivo google_list_of_establishments.js e cole o seguinte código:

```
import Api from './api';

const GoogleListOfEstablishmentsService = {
  index: (latitude, longitude) => Api.get(`/google_stores?latitude=${latitude}&longitude=${longitude}`),
}

export default GoogleListOfEstablishmentsService;
```

21 - Agora volte ao componente 'components/GoogleMaps' e substitua-o pelo seguinte código:

```
...

import EstablishmentsService from '../../services/google_list_of_establishments';

const GoogleMaps = () => {
    ...

    const [locations, setLocations] = useState([]);

    ...

    useEffect(() => {
        loadCoffeShops();
    }, [longitude])

    // Load all coffee shops
    async function loadCoffeShops() {
        const response = await EstablishmentsService.index(latitude, longitude);
        setLocations(response.data.results);
    }
  
    ...

                <GoogleMap mapContainerStyle={mapStyles}
                zoom={15}
                center={defaultCenter}>
                    {
                        locations.map(item => {
                            return (
                                <Marker key={item.name} 
                                    position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}
                                />
                            )
                        })
                    }
                </GoogleMap>
    ...
```

22 - Nossos marcadores agora funcionam e estão marcando os cafés \o/

### Setando informações do estabelecimento, pela API do google maps.

1 - Crie um service /src/services/google_establishment.js.

2 - Cole o seguinte código nele:
```
import Api from './api';

const GoogleEstablishmentService = {
  index: (place_id) => Api.get(`/google_stores/${place_id}`),
}

export default GoogleEstablishmentService;
```

3 - Dentro da pasta /src, crie uma pasta 'assets' e cole a imagem 'cafe-excesso.jpg' dentro dela.

4 - Crie um componente /src/components/Establishment.

5 - Dentro desse componente Establishment, crie dois arquivos. O index.js e o style.css.

6 - Vamos criar nosso componente /src/components/Establishment/index.js com a seguinte estrutura:

```
import React, { useEffect, useState } from 'react';

const Establishment = (props) => {
    return (
        <div className="left-bar">
            
        </div>
    )
}

export default Establishment;
```

7 - Agora vamos puxar a API pelo EstablishmentService no nosso código. Vamos adicionar o seguinte:

```
import React, { useEffect, useState } from 'react';

import EstablishmentService from '../../services/google_establishment';

...

const Establishment = (props) => {
    const [establishment, setEstablishment] = useState([]);

    useEffect(() => {
        getEstablishmentInformations();
    }, [props]);


    async function getEstablishmentInformations() {
        try {
            const response = await EstablishmentService.index(props.place.place_id);
            setEstablishment(response.data.result);
        } catch (error) {
            setEstablishment([]);
            console.log(error);
        }
    }

    return (

        ...
```

8 - Vamos começar a montar nossa estrutura HTML:
```
...

import EstablishmentService from '../../services/google_establishment.js';

import ProfilePhoto from '../../assets/cafe_excesso.jpg';

import './style.css';

...

    return (
        <div className="left-bar">
            <div className="about">
                {
                    (establishment.photos) ? 
                        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${establishment.photos[0].photo_reference}&sensor=false&key=SUA_GOOGLE_KEY_API`} alt="Store perfil"/> 
                    :  
                        <img src={ProfilePhoto} alt="No perfil" />
                }

                <br />
                
                <h3>{establishment.name}</h3>
            </div>
        </div>
    )
}

export default Establishment;
```

9 - Agora vamos adicionar o nome, o status da cafeteria (Aberto ou fechado), o horário de atendimento e o endereço formatado do estabelecimento:

```
...
                
                <h3>{establishment.name}</h3>

                <br />

                {
                    (establishment.opening_hours) ? 
                        <> 
                            { 
                                (establishment.opening_hours.open_now === true) ? 'Aberto' : 'Fechado' 
                            } 

                            <hr />

                            {
                                establishment.opening_hours.weekday_text.map(schedule => {
                                    return (
                                        <p key={schedule}>{schedule}</p>
                                    )
                                })
                            }   
                        </> 
                    : 
                        'Não há cadastros de horário de funcionamento.'
                }

                <hr />

                <p>
                    {establishment.formatted_address}
                </p>

                <hr />
            </div>
        </div>
    )
}

export default Establishment;
```
10 - Dentro do /src/components/Establishment/style.css, cole o seguinte código:

```
.left-bar {
    height: 100%;
    overflow-y: auto;
}

.left-bar img {
    height: 150px;
    width: 100%;
}

.left-bar h3 {
    color: rgba(220,110,50,0.7);
}

.left-bar p {
    font-size: 0.8rem;
}

.right {
    float: right;
}

.left {
    float: left;
}

.rating_star {
    width: 15px!important;
    height: 15px!important;
}

.opinions hr {
    width: 80%;
    margin-left: 10%;
}
```

11 - Nossa aplicação agora consegue puxar as informações direto do google \o/

### Instalando o rbx para fazer o grid da nossa aplicação e dar mais estilo

1 - Cole o seguinte comando no terminal:
```
npm install rbx
```


### Instalando o Materialize para colocar as estrelas para avaliação.

```
npm install @material-ui/core
npm install @material-ui/lab
```

### Conectando na nossa API local.

1 - Dentro de /src/services, crie os arquivos 'rating.js' e 'store.js'.

2 - Dentro do arquivo 'rating.js', cole o seguinte código:

```
import Api from './api';

const RatingService = {
  show: (google_place_id) => Api.get(`/ratings/${google_place_id}`),
  create: (store, rating) => Api.post('/ratings', { store: store, rating: rating} ),
}

export default RatingService;
```

3 - No arquivo 'store.js', cole o seguinte código:

```
import Api from './api';

const StoreService = {
  index: (latitude, longitude) => Api.get('/stores', {params: {latitude: latitude, longitude: longitude}}),
}

export default StoreService;
```

4 - Dentro do nosso componente /src/components/Establishment, crie a pasta ListRatings.

5 - Agora, dentro dessa pasta /src/components/Establishment/ListRatings, crie os arquivos 'index.js' e 'style.css'.

6 - Dentro do arquivo 'index.js', do componente ListRatings, estruture o seguinte código:

```
import React, { useEffect, useState } from 'react';

const ListRatings = (props) => {
    return (
        <>
            
        </>
    )
}

export default ListRatings;
```

7 - Agora vamos puxar nossas avaliações da API, adicionando o seguinte código:

```
...

import RatingService from '../../../services/rating.js';

...

const ListRatings = (props) => {
    const [ratingsList, setRatingsList] = useState([]);

    useEffect(() => {
        loadRatings();
    }, [props]);

    // Load Establishment Ratings
    async function loadRatings() {
        try {
            const response = await RatingService.show(props.place_id);
            setRatingsList(response.data);
        } catch (error) {
            setRatingsList([]);
            console.log(error);
        }
    }

    return (
        
    ...
```

8 - Feita a conexão com a API, vamos começar a estruturar nosso HTML:

```
    import { Column } from 'rbx';

    import Rating from '@material-ui/lab/Rating';

    import './style.css';
    ...

    return (
        <>
            <div className="opinions">
                <Column.Group>
                    <Column>
                        { 
                            (ratingsList.ratings_count > 0) ? ratingsList.ratings_count : 0 
                        } Opiniões 
                    </Column>

                    <Rating name="read-only" 
                            className="m-top"
                            value={
                                (ratingsList.ratings_count) > 0 ?
                                ratingsList.ratings_average : 0
                            } readOnly />
                </Column.Group>

                <hr />
            </div>
        </>

        ...
```

9 - Vamos, agora, listar nossas avaliações no HTML:

```
                ...

                </Column.Group>

                <hr />
            </div>
            
            {
                ratingsList.ratings &&
                <div className="listing_opinions">
                    {
                        ratingsList.ratings.map(rating => {
                            return (
                                <div key={rating.id}>
                                    <Column.Group>
                                        <Column>
                                            <b>{ rating.user_name }</b>
                                        </Column>

                                        <Column>
                                            <Rating name="read-only" 
                                                    value={
                                                        (rating.value) > 0 ?
                                                        rating.value : 0
                                                    } readOnly />
                                        </Column>
                                    </Column.Group>
    
                                    { rating.opinion }
                                    
                                    <p>
                                        { rating.date }
                                    </p>
    
                                    <hr />
                                </div>
                            )
                        })
                    }
                </div>
            }
        </>

        ...
```

10 - Dentro do arquivo 'style.css', do componente ListRatings, e cole o seguinte código:
```
.listing_opinions {
    height: 200px;
    overflow-y: auto;
}
```

11 - Agora, dentro do nosso componente /src/components/Establishment, no arquivo 'index.js', adicione o seguinte código:

```
import ListRatings from './ListRatings';

        ...

        <hr />

        <p>
            {establishment.formatted_address}
        </p>

        <hr />

        ...

        <ListRatings place_id={props.place.place_id} />

        ...

    </div>
</div>
    )
}

export default Establishment;
```

12 - No componente GoogleMaps, adicione o seguinte código:

```
...

import Establishment from '../Establishment';

...

const GoogleMaps = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [locations, setLocations] = useState([]);

    ...

    const [selected, setSelected] = useState({});

    ...


<GoogleMap mapContainerStyle={mapStyles}
    zoom={15}
    center={defaultCenter}>
        {
            locations.map(item => {
                return (
                    <Marker key={item.name} 
                        position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}
                        onClick={() => setSelected(item)}
                    />
                )
            })
        }

        ...

        {
            selected.place_id && 
                (
                    <Establishment place={selected} />
                )
        }

        ...

</GoogleMap>
```

13 - Seu código parecerá com o código abaixo:

```
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import EstablishmentsService from '../../services/google_list_of_establishments';

import Establishment from '../Establishment';

const GoogleMaps = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [selected, setSelected] = useState({});
    const [locations, setLocations] = useState([]);

    const mapStyles = {        
        height: "100vh",
        width: "100%"
    };

    useEffect(() => {
        setCurrentLocation();
    }, []);

    useEffect(() => {
        loadCoffeShops();
    }, [longitude])

    async function setCurrentLocation() {
        try {
            await navigator.geolocation.getCurrentPosition(function(position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        } catch (error) {
            alert('Habilite a localização para utilizar o aplicativo!');
        }
    }

    // Load all coffee shops
    async function loadCoffeShops() {
        const response = await EstablishmentsService.index(latitude, longitude);
        setLocations(response.data.results);
    }
    
    const defaultCenter = {
        lat: latitude, lng: longitude
    }
  
    return (
        <div className="map">
            <LoadScript googleMapsApiKey='SUA_GOOGLE_KEY_API'>
                <GoogleMap mapContainerStyle={mapStyles}
                zoom={15}
                center={(selected.geometry) ? '' : defaultCenter}>
                    {
                        locations.map(item => {
                            return (
                                <Marker key={item.name} 
                                    position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}
                                    onClick={() => setSelected(item)}
                                />
                            )
                        })
                    }

                    {
                        selected.place_id && 
                            (
                                <Establishment place={selected} />
                            )
                    }
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default GoogleMaps;
```

PS: ('center' do GoogleMap foi modificado a fim de consertar um bug de quando o Marker era clicado, o mapa redirecionava pro 'DefaultCenter').


### Setando o formulário

1 - Crie a pasta /src/components/Form.

2 - Agora crie os arquivos 'index.js' e 'style.js' no componente Form.

3 - No arquivo 'index.js', estruture o seguinte código:

```
import React, { useState } from 'react';

const Form = (props) => {
    return (
        <div>

        </div>
    )
}

export default Form;
```

4 - Agora vamos fazer nosso HTML do nosso Form controlado:

```
import React, { useState } from 'react';
import { Column } from 'rbx';

import Rating from '@material-ui/lab/Rating';

import './style.css';

const Form = (props) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [value, setValue] = useState(1);

    return (
        <div>
            <br />
            
            <b>Deixe sua Opinião</b>

            <form onSubmit={handleSubmit}>
                <input name="name" 
                       type="text" 
                       className="input" 
                       placeholder="Seu primeiro nome" 
                       onChange={(e) => setName(e.target.value)}
                       value={name}/>

                <textarea name="message" 
                          className="textarea"  
                          placeholder="Sua opinião"
                          onChange={(e) => setMessage(e.target.value)}
                          value={message}></textarea>

                <br />

                <Column.Group>
                    <Column className="form_stars">
                        <Rating
                        name="controlled"
                        value={value} 
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }} />
                    </Column>

                    <Column>
                        <input type="submit" value="Enviar" className="button is-danger" />
                    </Column>
                </Column.Group>
            </form>

        </div>
    )
}

export default Form;
```

5 - Agora vamos adicionar a resposta do Form, à API.

```
import RatingService from '../../services/rating';
...

const Form = (props) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [value, setValue] = useState(1);

    async function handleSubmit(e) {
        e.preventDefault();

        const store_params = {
            latitude: props.place.geometry.location.lat,
            longitude: props.place.geometry.location.lng,
            name: props.place.name,
            address: props.place.formatted_address,
            place_id: props.place.place_id
        }

        const rating_params = {
            value: (value == null) ? 1 : value,
            opinion: message,
            user_name: name
        }

        await RatingService.create(store_params, rating_params);

        setName('');
        setMessage('');
    }

    return (
    
    ...
```

6 - Agora, dentro do arquivo 'style.css', cole o seguinte código:

```
form > input, form > textarea {
    margin-top: 10px;
}

.form_stars {
    margin-top: 5px;
}
```

7 - No código do arquivo /src/components/Establishment/index.js, adicione o seguinte código:

```
import React, { useEffect, useState } from 'react';
    ...

import Form from '../Form';

    ...
                <p>
                    {establishment.formatted_address}
                </p>

                <hr />
                
                <ListRatings place_id={props.place.place_id} />
                
                ...

                <Form place={props.place} />

                ...
            </div>
        </div> 
```


### Criando a sessão de cafés mais próximos

1 - Crie a pasta /src/components/NearstCoffees.

2 - Dentro do componente NearstCoffees, crie os arquivos 'index.js' e 'style.css'.

3 - Adicione o seguinte código no 'index.js':

```
import React, { useEffect, useState } from 'react';

const NearstCoffees = (props) => {
    return (
        <div className="right-bar">
            
        </div>
    )
}

export default NearstCoffees;
```

4 - Agora vamos conectar com a nossa API de Stores:

```
import React, { useEffect, useState } from 'react';

import StoreService from '../../services/store';

const NearstCoffees = (props) => {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        loadNearstStores();
    }, []);

    async function loadNearstStores() {
        const response = await StoreService.index(props.latitude, props.longitude);
        setStores(response.data);
    }

    return (

        ...
```

5 - Agora vamos setar nosso HTML do componente NearstCoffees:

```
...

import ListCoffees from './ListCoffees';

import "./style.css";

    ...

    return (
        <div className="right-bar">
            <div className="head">
                <h2>Find My Coffee</h2>
            </div>

            <div className="body">
                <span>Mais amados perto de você</span>

                <hr />

                <ListCoffees stores={stores} />
            </div>

            <div className="signature">
                <h2>OneBitCode</h2>

                <br />

                <p>
                    Projeto Open Source desenvolvido na Semana Super Full 
                    Stack da escola online de programação <a href="https://onebitcode.com/">OneBitCode.com</a>
                </p>
            </div>
        </div>
    )
}

export default NearstCoffees;
```

6 - Dentro do 'style.css', cole o seguinte código:

```
.right-bar {
    right: 0;
    top: 0;
}

.right-bar > * {
    margin: 10px;
}

.head {
    text-align: center;
    font-size: 1.3rem;
}

.signature {
    font-size: 0.8em;
}

.signature h2 {
    font-size: 1.5em;
    font-weight: bold;
}

.signature a:hover {
    color: white;
}

.body {
    height: 450px;
    overflow-y: auto;
}

.body span {
    font-size: 1.4em;
    font-weight: 600;
}
```

7 - Crie o componente /src/components/NearstCoffees/ListCoffees.

8 - Dentro do componente ListCoffees, crie os arquivos 'index.js' e 'style.css'.

9 - Dentro do arquivo 'index.js', cole o seguinte código:

```
import React from 'react';

const ListEstablishments = (props) => {
    return (
        <>
            
        </>
    )
}

export default ListEstablishments;
```

10 - Vamos começar a estruturar o nosso HTML adicionando o nome e o endereço:

```
...

import './style.css';

const ListEstablishments = (props) => {
    return (
        <>
            {
                props.stores.map(store => {
                    return (
                        <div key={store.name} className="list_establishment">
                            <b>{store.name}</b>

                            <p>
                                {store.address}
                            </p>
                        </div>
                    )
                })
            }
        </>

        ...
```

11 - Agora vamos adicionar as estrelas de avaliação e a quantidade de opiniões:

```
...

import Rating from '@material-ui/lab/Rating';

import './style.css';

...

                            <p>
                                {store.address}
                            </p>
                            
                            <Column.Group className="listing_stores">
                                <Column>
                                    <Rating name="read-only"
                                            className="rating_stars"  
                                            value={
                                                (store.ratings_count) > 0 ?
                                                store.ratings_average : 0
                                            } readOnly />
                                </Column>

                                <Column className="right">
                                    { store.ratings_count } Opiniões
                                </Column>
                            </Column.Group>

                            <hr />
                        </div>
                    )
                })
            }
        </>
    )
}

export default ListEstablishments;
```

12 - Agora, dentro do arquivo 'style.css', cole o seguinte código:

```
.list_establishment p {
    margin-top: 10px;
    font-size: 0.8rem;
}

.list_establishment b {
    font-size: 0.9em;
}

.listing_stores {
    padding-top: 10px;
    font-size: 0.8em;
}

.rating_stars svg  {
    margin-right: -10px!important;
}
```

13 - No arquivo /src/components/GoogleMaps/index.js, coloque o seguinte código acima do fechamento da tag <GoogleMap>:
```
        {
            locations.map(item => {
                return (
                    <Marker key={item.name} 
                        position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}
                        onClick={() => setSelected(item)}
                    />
                )
            })
        }

        {
            selected.place_id && 
                (
                    <Establishment place={selected} />
                )
        }
        ...

        <NearstCoffees latitude={latitude} longitude={longitude} />

        ...
    </GoogleMap>
</LoadScript>
```

14 - Seu componente GoogleMaps deve parecer com o seguinte visual:
```
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import EstablishmentsService from '../../services/google_list_of_establishments';

import Establishment from '../Establishment';
import NearstCoffees from '../NearstCoffees';

const GoogleMaps = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [selected, setSelected] = useState({});
    const [locations, setLocations] = useState([]);

    const mapStyles = {        
        height: "100vh",
        width: "100%"
    };

    useEffect(() => {
        setCurrentLocation();
    }, []);

    useEffect(() => {
        loadCoffeShops();
    }, [longitude])

    async function setCurrentLocation() {
        try {
            await navigator.geolocation.getCurrentPosition(function(position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        } catch (error) {
            alert('Habilite a localização para utilizar o aplicativo!');
        }
    }

    // Load all coffee shops
    async function loadCoffeShops() {
        const response = await EstablishmentsService.index(latitude, longitude);
        setLocations(response.data.results);
    }
    
    const defaultCenter = {
        lat: latitude, lng: longitude
    }
  
    return (
        <div className="map">
            <LoadScript googleMapsApiKey='SUA_GOOGLE_KEY_API'>
                <GoogleMap mapContainerStyle={mapStyles}
                zoom={15}
                center={(selected.geometry) ? '' : defaultCenter}>
                    {
                        locations.map(item => {
                            return (
                                <Marker key={item.name} 
                                    position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}
                                    onClick={() => setSelected(item)}
                                />
                            )
                        })
                    }

                    {
                        selected.place_id && 
                            (
                                <Establishment place={selected} />
                            )
                    }

                    <NearstCoffees latitude={latitude} longitude={longitude} />
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default GoogleMaps;
```
