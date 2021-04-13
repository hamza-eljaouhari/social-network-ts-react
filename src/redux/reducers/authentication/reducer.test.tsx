import authenticationReducer from './reducer'

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(
      authenticationReducer(undefined, {})
    ).toEqual([])
  })

  it('should handle SET_AUTHENTICATION_TOKEN', () => {
    expect(
      authenticationReducer([], {
        type: 'SET_AUTHENTICATION_TOKEN',
        payload: {
          token: 'token'
        }
      })
    ).toEqual([
      {
        type: 'SET_AUTHENTICATION_TOKEN',
        payload: {
          token: 'token'
        }
      }
    ])
  })
})
