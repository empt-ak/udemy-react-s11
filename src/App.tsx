import DeleteConfirmation from './components/DeleteConfirmation.tsx'
import Modal, { ModalRef } from './components/Modal.tsx'
import Places from './components/Places.tsx'
import { AVAILABLE_PLACES } from './data.ts'

import logo from './assets/logo.png'
import { useRef, useState } from 'react'
import { Place } from './models/place.ts'

const App = () => {
  const modal = useRef<ModalRef>(null)
  const selectedPlace = useRef<string>()
  const [pickedPlaces, setPickedPlaces] = useState<Place[]>([])

  const handleStartRemovePlace = (id: string) => {
    modal.current!.open()
    selectedPlace.current = id
  }

  const handleStopRemovePlace = () => {
    modal.current!.close()
  }

  const handleSelectPlace = (id: string) => {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((p) => p.id === id)) {
        return prevPickedPlaces
      }

      const place = AVAILABLE_PLACES.find((p) => p.id === id)!
      return [place, ...prevPickedPlaces]
    })
  }

  const handleRemovePlace = () => {
    setPickedPlaces((previous) =>
      previous.filter((p) => p.id !== selectedPlace.current)
    )
    modal.current!.close()
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logo} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  )
}

export default App
