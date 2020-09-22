## Construindo nosso APP

### Criando nosso projeto

1 - Para começar, entre na pasta find-my-coffe, e vamos criar o nosso projeto com o seguinte comando:

```
npx create-react-app web
```

2 - Dentro do projeto Web, entre na pasta /src e crie a pasta '/components/GoogleMaps'.

3 - Dentro da '/src/components/GoogleMaps', crie o arquivo 'index.js'.

4 - Substitua o código do '/src/components/GoogleMaps/index.js' pelo código abaixo:

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