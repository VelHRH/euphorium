'use client'

import { useMutation, useQuery } from '@apollo/client'
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import { FC, useState } from 'react'

import { CREATE_SONG } from '$graphql/mutations/song/create'
import { DELETE_SONG } from '$graphql/mutations/song/delete'
import { LIST_SONGS } from '$graphql/queries/song/list'

export const HomePage: FC = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newSongName, setNewSongName] = useState('')

  const { loading, data, error, refetch } = useQuery(LIST_SONGS)
  const [createSong, { loading: createLoading }] = useMutation(CREATE_SONG)
  const [deleteSong, { loading: deleteLoading }] = useMutation(DELETE_SONG)

  const handleCreateSong = async () => {
    if (!newSongName.trim()) {
      return
    }

    try {
      await createSong({
        variables: { input: { name: newSongName.trim() } },
      })
      setNewSongName('')
      setIsCreateDialogOpen(false)
      refetch()
    } catch (error) {
      console.error('Failed to create song:', error)
    }
  }

  const handleDeleteSong = async (songName: string) => {
    try {
      await deleteSong({
        variables: { input: { name: songName } },
      })
      refetch()
    } catch (error) {
      console.error('Failed to delete song:', error)
    }
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">Error loading songs: {error.message}</Alert>
      </Box>
    )
  }

  const songs = data?.songs || []

  return (
    <Box p={3} maxWidth="800px" mx="auto">
      <Typography variant="h4" component="h1" gutterBottom>
        Song Manager
      </Typography>

      <Card>
        <CardContent>
          {songs.length === 0 ? (
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              py={4}
            >
              No songs yet. Create your first song!
            </Typography>
          ) : (
            <List>
              {songs.map((song: any) => (
                <ListItem
                  key={song.id}
                  divider
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteSong(song.name)}
                      disabled={deleteLoading}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={song.name}
                    secondary={`Created: ${new Date(song.createdAt).toLocaleDateString()}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setIsCreateDialogOpen(true)}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Song</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Song Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newSongName}
            onChange={(e) => setNewSongName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateSong()}
            disabled={createLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsCreateDialogOpen(false)}
            disabled={createLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateSong}
            variant="contained"
            disabled={!newSongName.trim() || createLoading}
          >
            {createLoading ? <CircularProgress size={20} /> : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
