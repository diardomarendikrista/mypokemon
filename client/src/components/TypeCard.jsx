import React, { useEffect, useState } from 'react';

export default function TypeCard (props) {
  const { type } = props;
  const [color, setColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(_ => {
    setColor('');
    settingColor();
    // eslint-disable-next-line
  }, [])

  const settingColor = () => {
    switch (type.name) {
      case 'bug':
        setColor('#fff');
        setBackgroundColor('#1C4B27');
        break;
      case 'dark':
        setColor('#fff');
        setBackgroundColor('#040706');
        break;
      case 'dragon':
        setColor('#fff');
        setBackgroundColor('#448B95');
        break;
      case 'electric':
        setColor('#000');
        setBackgroundColor('#E3E32B');
        break;
      case 'fairy':
        setColor('#fff');
        setBackgroundColor('#971944');
        break;
      case 'fighting':
        setColor('#fff');
        setBackgroundColor('#994025');
        break;
      case 'fire':
        setColor('#fff');
        setBackgroundColor('#AB1F23');
        break;
      case 'flying':
        setColor('#fff');
        setBackgroundColor('#4A677D');
        break;
      case 'ghost':
        setColor('#fff');
        setBackgroundColor('#33336B');
        break;
      case 'grass':
        setColor('#fff');
        setBackgroundColor('#147B3D');
        break;
      case 'ground':
        setColor('#fff');
        setBackgroundColor('#A9702C');
        break;
      case 'ice':
        setColor('#000');
        setBackgroundColor('#86D2F5');
        break;
      case 'normal':
        setColor('#fff');
        setBackgroundColor('#75515B');
        break;
      case 'poison':
        setColor('#fff');
        setBackgroundColor('#5E2D88');
        break;
      case 'psychic':
        setColor('#fff');
        setBackgroundColor('#A42A6C');
        break;
      case 'rock':
        setColor('#fff');
        setBackgroundColor('#48180B');
        break;
      case 'steel':
        setColor('#fff');
        setBackgroundColor('#5F756D');
        break;
      case 'water':
        setColor('#fff');
        setBackgroundColor('#1552E2');
        break;
      default:
        setColor('#000');
        setBackgroundColor('#B0DFF9');
        break;
    }
  }

  return (
    <div className="type-card" style={{backgroundColor:backgroundColor}}>
      <p className="type-card-text" style={{color:color}}>{type.name}</p>
    </div>
  )
}