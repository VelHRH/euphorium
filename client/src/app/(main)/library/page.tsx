'use client'

import { EntityName } from '$api/entity-names'
import { CREATE_SONG } from '$api/song/mutations/create'
import { DELETE_SONG } from '$api/song/mutations/delete'
import { LIST_SONGS } from '$api/song/querries/list'
import { Button } from '$components/ui/button'
import { Dialog } from '$components/ui/dialog'
import { Input } from '$components/ui/input'
import { Spinner } from '$components/ui/spinner'
import { useMutation, useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { Song } from 'shared'

export default function LibraryPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newSongName, setNewSongName] = useState('')

  const { loading, data, error } = useQuery(LIST_SONGS)
  const [createSong, { loading: createLoading }] = useMutation(CREATE_SONG, {
    update: (cache, { data }) => {
      if (data?.createSong) {
        const existingSongs = cache.readQuery({ query: LIST_SONGS })
        if (existingSongs) {
          cache.writeQuery({
            query: LIST_SONGS,
            data: {
              songs: [
                ...existingSongs.songs,
                {
                  ...data.createSong,
                  __typename: EntityName.SONG,
                },
              ],
            },
          })
        }
      }
    },
  })
  const [deleteSong, { loading: deleteLoading }] = useMutation(DELETE_SONG, {
    update: (cache, { data }) => {
      if (data?.deleteSong) {
        const existingSongs = cache.readQuery({ query: LIST_SONGS })
        if (existingSongs) {
          cache.writeQuery({
            query: LIST_SONGS,
            data: {
              songs: existingSongs.songs.filter(
                (song) => song.id !== data.deleteSong.id,
              ),
            },
          })
        }
      }
    },
  })

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
    } catch (error) {
      console.error('Failed to create song:', error)
    }
  }

  const handleDeleteSong = async (id: Song['id']) => {
    try {
      await deleteSong({
        variables: { input: { id } },
      })
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
    <div className="p-3 max-w-800px mx-auto bg-background">
      <p className="text-2xl font-bold">Song Manager</p>

      <div>
        <div className="flex flex-col gap-2">
          {songs.length === 0 ? (
            <p className="text-sm text-gray-500">
              No songs yet. Create your first song!
            </p>
          ) : (
            <div>
              {songs.map((song) => (
                <div key={song.id} className="flex flex-col gap-2">
                  <p>{song.name}</p>
                  <p>{`Created: ${new Date(song.createdAt).toLocaleDateString()}`}</p>
                  <Button
                    onClick={() => handleDeleteSong(song.id)}
                    disabled={deleteLoading}
                    variant="destructive"
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
