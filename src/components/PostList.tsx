import * as React from 'react';
import dayjs from 'dayjs';
import { IPost } from '@/libs/model/post';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { cache } from 'swr';

const PostList: React.FC = () => {
  const posts: IPost[] = cache.get('/api/post');

  return (
    <Paper>
      <List>
        {posts.map((post) => (
          <React.Fragment key={post.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={post.author.name} src={post.author.avatarUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={`${post.author.name} ${dayjs(post.createdAt).format(
                  'YYYY-MM-DD HH:mm',
                )}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {post.content}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default PostList;
