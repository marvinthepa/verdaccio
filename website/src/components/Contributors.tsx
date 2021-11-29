import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { blue, green, yellow } from '@material-ui/core/colors';
//import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import List from "@material-ui/core/List";
import { ListItemSecondaryAction, Tooltip } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green500 } from "material-ui/styles/colors";

import StarIcon from '@material-ui/icons/Star';
import Layout from '@theme/Layout';
import React from 'react';

const generateImage = (id) => `https://avatars3.githubusercontent.com/u/${id}?s=120&v=4`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4B5E40',
    },
    secondary: {
      main: '#808a79',
    },
  },
});

const useStyles = makeStyles((theme) =>
  createStyles({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    medium: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    starColor: {
      color: yellow[500],
    },
    archived: {
      opacity: `0.4`,
    },
    emojiEvent: {
      color: green[800],
    },
  })
);

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 8,
    // border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

type ContributorsProps = {
  contributors: any;
};

function convertItemTo(item) {
  const node  =  { 
    url: item.login,
    userId: item.id,
    id: `key-${item.login}`,
    contributions: item.contributions,
    repositories: item.repositories,   
  }

     return {node}

}
 

const Contributors: React.FC<ContributorsProps> = ({ contributors }): React.ReactElement => {
  const [user, setUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = (item) => {
    setUser(item);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setUser(null);
  };

  return (
    <>
      <Layout
        title="Contributors 2"
        description="Verdaccio Contributors, thanks to the community Verdaccio keeps running">

            <ThemeProvider theme={theme}>
            <div style={{ display: "flex", width: "100%", flexFlow: "wrap" }}>

            {contributors.map((item) => {
              const userItem = convertItemTo(item);
              return (
                <div
                  style={{ flex: 'auto' }}
                  key={userItem.node.url}
                  style={{ cursor: "pointer", margin: "10px" }}
                   onClick={() => handleClickOpen(userItem)}>
                  <Avatar
                    src={generateImage(userItem.node.userId)}
                    alt={userItem.node.url}
                    className={classes.large}
                  />
                </div>
              );
            })}
          </div>
          {user && (
          <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
          >
            <DialogTitle id="simple-dialog-title">
              <Grid
                container
                alignContent="center-flex"
                alignItems="center"
                justify="center"
              >
                <Grid item lg="3" md="3" sm="3">
                  <a
                    href={"https://github.com/" + user.node.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Avatar
                      src={generateImage(user.node.userId)}
                      alt={user.node.url}
                      className={classes.medium}
                    />
                  </a>
                </Grid>
                <Grid item lg="6" md="6" sm="6">
                  <Typography variant="h6">{user.node.url}</Typography>
                </Grid>
                <Grid item item lg="2" md="2" sm="2">
                
                  <Chip
                    icon={<EmojiEventsIcon className={classes.emojiEvent} />}
                    label={user.node.contributions}
                    color="default"
                  />   
                </Grid>
              </Grid>
            </DialogTitle>

            <DialogContent>
              <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                  {user.node.repositories.map((repo) => {
                    return (
                      <ListItemLink
                        className={repo.archived ? classes.archived : ""}
                        key={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ListItemIcon>
                          <Badge
                            badgeContent={repo.contributions}
                            color="green"
                            max={9999}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <MergeTypeIcon />
                          </Badge>
                        </ListItemIcon>
                        <Tooltip title={repo.archived ? "archived" : ""}>
                          <ListItemText
                            primary={
                              <Typography color="primary">
                                {repo.name}
                              </Typography>
                            }
                            secondary={
                              <Typography color="secondary" variant="body2">
                                {repo.description}
                              </Typography>
                            }
                          />
                        </Tooltip>
                        <ListItemSecondaryAction
                          className={repo.archived ? classes.archived : ""}
                        >
                          <a
                            href={
                              "https://github.com/" +
                              repo.full_name +
                              "/stargazers"
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <IconButton edges="end" aria-label="delete">
                              <StyledBadge badgeContent={repo.staergezers} max={999}>
                                <StarIcon className={classes.starColor} />
                              </StyledBadge>
                            </IconButton>
                          </a>
                        </ListItemSecondaryAction>
                      </ListItemLink>
                    );
                  })}
                </List>
              </div>
              {/* {JSON.stringify(user.node.repositories, null, 2)} */}
            </DialogContent>
          </Dialog>
        )}
        </ThemeProvider>
        </Layout>
    </>
  );
};

export default Contributors;