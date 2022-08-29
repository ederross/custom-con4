import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { newPlayerState, playAgainstBOTState } from 'state';
import ColorPicker from './ColorPicker';

const ModalCompetitors = () => {
  // Modal methods
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newPlayers, setNewPlayersState] = useRecoilState(newPlayerState);

  //   PlayAgainstBOT
  const [playAgainstBOT, setPlayAgainstBOT] =
    useRecoilState(playAgainstBOTState);

  //   Player 1 INFO
  const [player1Name, setPlayer1Name] = useState<string>('');
  const [player1Color, setPlayer1Color] = useState<string>('#F5A623');

  //   Player 2 INFO
  const [player2Name, setPlayer2Name] = useState<string>('');
  const [player2Color, setPlayer2Color] = useState<string>('#008252');

  const [error, setError] = useState(false);

  useEffect(() => {
    onOpen();
  }, []);

  const handleCompetitors = () => {
    let error;

    if (!playAgainstBOT) {
      if (
        player1Name === '' ||
        player1Color === '' ||
        player2Name === '' ||
        player2Color === '' ||
        player1Color === player2Color
      ) {
        setError(true);
        return;
      }
      setNewPlayersState([
        { name: player1Name, color: player1Color },
        { name: player2Name, color: player2Color },
      ]);

      !error && onClose();
      return;
    } else {
      if (player1Name === '' || player1Color === '') {
        setError(true);
        return;
      }
      var randomBOTColor = Math.floor(Math.random() * 16777215).toString(16);
      setNewPlayersState([
        { name: player1Name, color: player1Color },
        { name: 'BOT', color: '#' + randomBOTColor },
      ]);

      !error && onClose();
    }
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set player(s) name & game mode:</ModalHeader>

          <ModalBody>
            <FormControl>
              <FormLabel>Player 1</FormLabel>
              <Input
                mb={1}
                onChange={(event) => setPlayer1Name(event.target.value)}
                type="text"
              />

              <ColorPicker
                initialRGBColor={{
                  r: 245,
                  g: 166,
                  b: 35,
                  a: 1,
                }}
                setPlayerColor={setPlayer1Color}
              />
              {!playAgainstBOT && (
                <>
                  <FormLabel mt={4}>Player 2</FormLabel>
                  <Input
                    mb={1}
                    onChange={(event) => setPlayer2Name(event.target.value)}
                    type="text"
                  />

                  <ColorPicker
                    initialRGBColor={{
                      r: 15,
                      g: 127,
                      b: 94,
                      a: 1,
                    }}
                    setPlayerColor={setPlayer2Color}
                  />
                </>
              )}
            </FormControl>
            {error && (
              <Alert mt={8} status="error">
                <AlertIcon />

                <AlertDescription>Player name is required</AlertDescription>
              </Alert>
            )}
          </ModalBody>

          <ModalFooter>
            <Checkbox
              mr={4}
              onChange={(event) => {
                event.preventDefault();
                setPlayAgainstBOT(event.target.checked);
              }}
              checked={playAgainstBOT}
            >
              Play with BOT?
            </Checkbox>
            <Button colorScheme="blue" mr={3} onClick={handleCompetitors}>
              Start
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCompetitors;
