'use client'

import { useMutation, useQuery } from '@apollo/client'
import { FC, useState } from 'react'

import { CREATE_SONG } from '$/lib/graphql/mutations/song/create'
import { DELETE_SONG } from '$/lib/graphql/mutations/song/delete'
import { LIST_SONGS } from '$/lib/graphql/queries/song/list'
import { Button } from '$components/ui/button'
import { Dialog } from '$components/ui/dialog'
import { Input } from '$components/ui/input'
import { Spinner } from '$components/ui/spinner'

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
    return <Spinner />
  }

  if (error) {
    return <p>Error loading songs: {error.message}</p>
  }

  const songs = data?.songs || []

  return (
    <div className="p-3 max-w-800px mx-auto">
      <p className="text-2xl font-bold">Song Manager</p>

      <div>
        <div className="flex flex-col gap-2">
          {songs.length === 0 ? (
            <p className="text-sm text-gray-500">
              No songs yet. Create your first song!
            </p>
          ) : (
            <div>
              {songs.map((song: any) => (
                <div key={song.id} className="flex flex-col gap-2">
                  <p>{song.name}</p>
                  <p>{`Created: ${new Date(song.createdAt).toLocaleDateString()}`}</p>
                  <Button
                    onClick={() => handleDeleteSong(song.name)}
                    disabled={deleteLoading}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button onClick={() => setIsCreateDialogOpen(true)}>Create Song</Button>

      <Dialog open={isCreateDialogOpen}>
        <p>Create New Song</p>
        <div>
          <Input
            value={newSongName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewSongName(e.target.value)
            }
            onKeyDown={(e) => e.key === 'Enter' && handleCreateSong()}
            disabled={createLoading}
          />
        </div>
      </Dialog>
    </div>
  )
}
