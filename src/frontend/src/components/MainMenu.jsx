import {
  Link,
  Divider,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

export const MainMenu = (
  <>
    <Link href="/" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Accueil" />
      </ListItemButton>
    </Link>
    <Divider />
    <Divider />
    <Link href="/option-1-1/" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <FormatListBulletedIcon color="success" />
        </ListItemIcon>
        <ListItemText primary="Option 1.1" />
      </ListItemButton>
    </Link>

    <Link href="/option-1-2/" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <ArticleIcon color="success" />
        </ListItemIcon>
        <ListItemText primary="Option 1.2." />
      </ListItemButton>
    </Link>
    <Divider />
    <Divider />
    <Link href="/option-2-1/" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <MoreTimeIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Option 2.1." />
      </ListItemButton>
    </Link>

    <Link href="/option-2-2/" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <PlaylistAddCheckIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Option 2.2." />
      </ListItemButton>
    </Link>
    <Divider />
    <Divider />
    <Link href="/option-3/" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <FactCheckIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Option 3" />
      </ListItemButton>
    </Link>
  </>
);
