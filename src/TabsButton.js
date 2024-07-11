import './App.css';

function TabsButton(props) {
    return (
      <button className='Tabs-button' onClick={props.onClick}>
        {props.text}
      </button>
    );
  }

export default TabsButton;