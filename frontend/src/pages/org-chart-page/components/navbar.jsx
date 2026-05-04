import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AccountMenu from "./account-icon-menu";
import AdjustDrawer from "../components/adjust-drawer";
import SearchField from "../components/search-field";
import Logo from "../assets/ArbreLogo.svg";

export default function SearchAppBar({ chartInstance, data, onDataUpload }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#fff' }}>
        <Toolbar>
          <img src={Logo} alt="Arbre Logo" style={{ width: 32, height: 30, marginRight: 12 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, color: '#000', mr: 2, fontFamily: 'Inter', fontWeight: 400, fontSize: 18 }}
          >
            Arbre Org Chart
          </Typography>
          <SearchField chartInstance={chartInstance} data={data} sx={{ mr: 2, }}  />
          <Box sx={{ flexGrow: 1 }} />
          <AdjustDrawer chartInstance={chartInstance} onDataUpload={onDataUpload} />
          <Divider 
            orientation="vertical" 
            variant="middle" 
            flexItem 
            sx={{ height: 24, my: 'auto', mx: 0.5, borderWidth: 1.2, borderColor: 'rgba(0, 0, 0, 0.12)' }} 
          />
          <AccountMenu />

        </Toolbar>
      </AppBar>
    </Box>
  );
}