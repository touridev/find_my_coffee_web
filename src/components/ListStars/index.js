import React from 'react';

import { Column } from 'rbx';

import StarYellow from '../../assets/star_yellow.png';
import StarGray from '../../assets/star.png';

const ListStars = (props) => {
    return (
        <Column>
            {
                props.count > 0 &&
                (
                    [...Array(props.average)].map((i) => <img src={StarYellow} className="rating_star" alt="star yellow" />)
                )
            }

            {
                props.count > 0 &&
                (
                    [...Array(5 - props.average)].map((i) => <img src={StarGray} className="rating_star" alt="star gray" />)
                )
            }
        </Column>
    )
}

export default ListStars;