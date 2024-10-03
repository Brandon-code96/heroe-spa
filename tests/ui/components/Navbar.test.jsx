import { render, screen, fireEvent } from "@testing-library/react"
import { AuthContext } from "../../../src/auth/context/AuthContext"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { Navbar } from "../../../src/ui/components/NavBar"

const mockedUseNavigate = jest.fn()

jest.mock( 'react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <Navbar />', () => {

  const contextValue = {
    logged: true,
    user: {
      name: 'Brandon Antonny'
    },
    logout: jest.fn()
  }

  beforeEach( () => jest.clearAllMocks())

  test('debe de mostrar el nombre del usuario', () => {

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    
    expect( screen.getByText('Brandon Antonny') ).toBeTruthy()
  })

  test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    
    const logoutBtn = screen.getByRole('button')
    fireEvent.click( logoutBtn )

    expect( contextValue.logout ).toHaveBeenCalled()
    expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', {'replace': true})

  })

})