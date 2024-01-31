import React from 'react'
import styles from './style'
import { DialogContent,Box,Typography,Button } from '@mui/material';
import fontsStyles from '../../styles/fontStyles';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
const DialogInfo = ({info1,info2,button1,button2,changeRoute,handleCloseDialog}) => {
    const classes=styles();
    const fontClasses = fontsStyles();
    if(info2===''){ 
        return (
            <Box>
                <DialogContent>
                    <Box className={classes.mainWrapper}>
                        <CheckCircleOutlineRoundedIcon sx={{fontSize:'150px',color:'#66BB6A',marginBottom: '20px'}}/>
                            <Typography variant="h5" component="h5" sx={{marginBottom: '40px'}}>
                            <b>{info1}</b>
                        </Typography> 
                        <Button sx={{fontFamily: 'Poppins',borderRadius:'10px',textIndent:'0.5em',textTransform:'none',padding:'10px', width: '250px', marginBottom: '10px'}} variant='outlined' color='warning' onClick={changeRoute}>
                            <AddRoundedIcon style={{fontSize: "20px"}}/>
                            <span className={fontClasses.dashBoardItemFont}><b>{button1}</b></span>
                        </Button> 
                        <Button sx={{fontFamily: 'Poppins', background:"#F89C1D",borderRadius:'10px',textIndent:'0.5em',textTransform:'none',padding:'10px',  width: '250px'}} variant='contained' onClick={handleCloseDialog}>
                            <GroupRoundedIcon style={{fontSize: "20px"}}/>
                            <b><span className={fontClasses.dashBoardItemFont}>{button2}</span></b>
                        </Button>
                    </Box> 
                </DialogContent>
            </Box>
        )
    }else{
        return(
            <Box>
                <DialogContent>
                    <Box className={classes.mainWrapper}>
                        <CheckCircleOutlineRoundedIcon sx={{fontSize:'150px',color:'#66BB6A',marginBottom: '20px'}}/>
                         <Typography variant="h5" component="h5" sx={{marginBottom: '5px'}}>
                            <b>{info1}</b>
                        </Typography> 
                        <Typography variant="p" component="p" sx={{marginBottom: '40px'}}>
                            {info2}
                        </Typography> 
                        <Button sx={{fontFamily: 'Poppins',borderRadius:'10px',textIndent:'0.5em',textTransform:'none',padding:'10px', width: '250px', marginBottom: '10px'}} variant='outlined' color='warning' onClick={changeRoute}>
                            <AddRoundedIcon style={{fontSize: "20px"}}/>
                            <span className={fontClasses.dashBoardItemFont}><b>Enviar correo</b></span>
                        </Button> 
                        <Button sx={{fontFamily: 'Poppins', background:"#F89C1D",borderRadius:'10px',textIndent:'0.5em',textTransform:'none',padding:'10px',  width: '250px'}} variant='contained' >
                            <GroupRoundedIcon style={{fontSize: "20px"}}/>
                            <b><span className={fontClasses.dashBoardItemFont}>Nueva transacción</span></b>
                        </Button>
                        
                    </Box>
                </DialogContent>
            </Box>
        )
    }
    
}

export default DialogInfo