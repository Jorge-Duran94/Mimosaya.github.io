import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Tabla } from './Tabla';
import { Fotos } from './Fotos';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from '@mui/material';
import { Estaditicas } from './Estaditicas';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export const Tabses = ({setLog}) => {
  const adminmy = JSON.parse(localStorage.getItem("adminmy"))
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const desloguear = () => {
      localStorage.removeItem("adminmy")
      setLog(false) 
    }



  return (
    <>
<div align="end">
    <Button onClick={() => desloguear()}> {adminmy.usuario} / Salir <ExitToAppIcon/></Button>
  </div> 
   <hr/>

<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Modelos" {...a11yProps(0)} />
          <Tab label="Fotos" {...a11yProps(1)} />
          <Tab label="Estadisticas" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Tabla/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div className="myflex">
        <Fotos />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Estaditicas />
      </CustomTabPanel>
    </Box>

    </>
  )
}