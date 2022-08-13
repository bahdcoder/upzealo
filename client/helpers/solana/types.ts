export type Upzealo = {
  version: '0.1.0'
  name: 'upzealo'
  instructions: [
    {
      name: 'createAccount'
      accounts: [
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'wallet'
          isMut: false
          isSigner: false
        },
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'createBounty'
      accounts: [
        {
          name: 'wallet'
          isMut: true
          isSigner: true
        },
        {
          name: 'user'
          isMut: true
          isSigner: false
        },
        {
          name: 'bounty'
          isMut: true
          isSigner: true
        },
        {
          name: 'bountyAuthority'
          isMut: true
          isSigner: false
        },
        {
          name: 'mint'
          isMut: true
          isSigner: false
        },
        {
          name: 'mintSource'
          isMut: true
          isSigner: false
        },
        {
          name: 'bountyWallet'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        },
        {
          name: 'bountyAuthorityBump'
          type: 'u8'
        }
      ]
    },
    {
      name: 'setBountyWinner'
      accounts: [
        {
          name: 'wallet'
          isMut: true
          isSigner: true
        },
        {
          name: 'winner'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: true
          isSigner: false
        },
        {
          name: 'bounty'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'claimBountyReward'
      accounts: [
        {
          name: 'wallet'
          isMut: true
          isSigner: true
        },
        {
          name: 'user'
          isMut: true
          isSigner: false
        },
        {
          name: 'bounty'
          isMut: true
          isSigner: false
        },
        {
          name: 'bountyAuthority'
          isMut: true
          isSigner: false
        },
        {
          name: 'mint'
          isMut: true
          isSigner: false
        },
        {
          name: 'mintDestination'
          isMut: true
          isSigner: false
        },
        {
          name: 'bountyWallet'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    }
  ]
  accounts: [
    {
      name: 'bounty'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'creator'
            type: 'publicKey'
          },
          {
            name: 'winner'
            type: 'publicKey'
          },
          {
            name: 'amount'
            type: 'u64'
          },
          {
            name: 'mint'
            type: 'publicKey'
          },
          {
            name: 'winnerSet'
            type: 'bool'
          },
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'authoritySeed'
            type: 'publicKey'
          },
          {
            name: 'authorityBumpSeed'
            type: {
              array: ['u8', 1]
            }
          },
          {
            name: 'paid'
            type: 'bool'
          }
        ]
      }
    },
    {
      name: 'user'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'wallet'
            type: 'publicKey'
          }
        ]
      }
    }
  ]
  errors: [
    {
      code: 6000
      name: 'ArithmeticError'
      msg: 'failed to perform some math operation safely'
    },
    {
      code: 6001
      name: 'UnknownInstruction'
      msg: 'unknown instruction called'
    },
    {
      code: 6002
      name: 'InvalidParameter'
      msg: 'invalid parameter passed'
    },
    {
      code: 6003
      name: 'AnchorSerializationIssue'
      msg: 'anchor serialization issue'
    },
    {
      code: 6004
      name: 'AmountMismatch'
      msg: 'two amounts that are supposed to be equal are not'
    },
    {
      code: 6005
      name: 'Reserved05'
    },
    {
      code: 6006
      name: 'Reserved06'
    },
    {
      code: 6007
      name: 'Reserved07'
    },
    {
      code: 6008
      name: 'Reserved08'
    },
    {
      code: 6009
      name: 'Reserved09'
    },
    {
      code: 6010
      name: 'Reserved10'
    },
    {
      code: 6011
      name: 'Reserved11'
    },
    {
      code: 6012
      name: 'Reserved12'
    },
    {
      code: 6013
      name: 'Reserved13'
    },
    {
      code: 6014
      name: 'Reserved14'
    },
    {
      code: 6015
      name: 'Reserved15'
    },
    {
      code: 6016
      name: 'Reserved16'
    },
    {
      code: 6017
      name: 'Reserved17'
    },
    {
      code: 6018
      name: 'Reserved18'
    },
    {
      code: 6019
      name: 'Reserved19'
    },
    {
      code: 6020
      name: 'Reserved20'
    },
    {
      code: 6021
      name: 'Reserved21'
    },
    {
      code: 6022
      name: 'Reserved22'
    },
    {
      code: 6023
      name: 'Reserved23'
    },
    {
      code: 6024
      name: 'Reserved24'
    },
    {
      code: 6025
      name: 'Reserved25'
    },
    {
      code: 6026
      name: 'Reserved26'
    },
    {
      code: 6027
      name: 'Reserved27'
    },
    {
      code: 6028
      name: 'Reserved28'
    },
    {
      code: 6029
      name: 'Reserved29'
    },
    {
      code: 6030
      name: 'Reserved30'
    },
    {
      code: 6031
      name: 'Reserved31'
    },
    {
      code: 6032
      name: 'Reserved32'
    },
    {
      code: 6033
      name: 'Reserved33'
    },
    {
      code: 6034
      name: 'Reserved34'
    },
    {
      code: 6035
      name: 'Reserved35'
    },
    {
      code: 6036
      name: 'Reserved36'
    },
    {
      code: 6037
      name: 'Reserved37'
    },
    {
      code: 6038
      name: 'Reserved38'
    },
    {
      code: 6039
      name: 'Reserved39'
    },
    {
      code: 6040
      name: 'Reserved40'
    },
    {
      code: 6041
      name: 'Reserved41'
    },
    {
      code: 6042
      name: 'Reserved42'
    },
    {
      code: 6043
      name: 'Reserved43'
    },
    {
      code: 6044
      name: 'Reserved44'
    },
    {
      code: 6045
      name: 'Reserved45'
    },
    {
      code: 6046
      name: 'Reserved46'
    },
    {
      code: 6047
      name: 'Reserved47'
    },
    {
      code: 6048
      name: 'Reserved48'
    },
    {
      code: 6049
      name: 'Reserved49'
    },
    {
      code: 6050
      name: 'Reserved50'
    },
    {
      code: 6051
      name: 'Reserved51'
    },
    {
      code: 6052
      name: 'Reserved52'
    },
    {
      code: 6053
      name: 'Reserved53'
    },
    {
      code: 6054
      name: 'Reserved54'
    },
    {
      code: 6055
      name: 'Reserved55'
    },
    {
      code: 6056
      name: 'Reserved56'
    },
    {
      code: 6057
      name: 'Reserved57'
    },
    {
      code: 6058
      name: 'Reserved58'
    },
    {
      code: 6059
      name: 'Reserved59'
    }
  ]
}

export const IDL: Upzealo = {
  version: '0.1.0',
  name: 'upzealo',
  instructions: [
    {
      name: 'createAccount',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'wallet',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createBounty',
      accounts: [
        {
          name: 'wallet',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'bounty',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'bountyAuthority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mintSource',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'bountyWallet',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'bountyAuthorityBump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'setBountyWinner',
      accounts: [
        {
          name: 'wallet',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'winner',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'bounty',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'claimBountyReward',
      accounts: [
        {
          name: 'wallet',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'bounty',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'bountyAuthority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mintDestination',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'bountyWallet',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'bounty',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'creator',
            type: 'publicKey',
          },
          {
            name: 'winner',
            type: 'publicKey',
          },
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'mint',
            type: 'publicKey',
          },
          {
            name: 'winnerSet',
            type: 'bool',
          },
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'authoritySeed',
            type: 'publicKey',
          },
          {
            name: 'authorityBumpSeed',
            type: {
              array: ['u8', 1],
            },
          },
          {
            name: 'paid',
            type: 'bool',
          },
        ],
      },
    },
    {
      name: 'user',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'wallet',
            type: 'publicKey',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'ArithmeticError',
      msg: 'failed to perform some math operation safely',
    },
    {
      code: 6001,
      name: 'UnknownInstruction',
      msg: 'unknown instruction called',
    },
    {
      code: 6002,
      name: 'InvalidParameter',
      msg: 'invalid parameter passed',
    },
    {
      code: 6003,
      name: 'AnchorSerializationIssue',
      msg: 'anchor serialization issue',
    },
    {
      code: 6004,
      name: 'AmountMismatch',
      msg: 'two amounts that are supposed to be equal are not',
    },
    {
      code: 6005,
      name: 'Reserved05',
    },
    {
      code: 6006,
      name: 'Reserved06',
    },
    {
      code: 6007,
      name: 'Reserved07',
    },
    {
      code: 6008,
      name: 'Reserved08',
    },
    {
      code: 6009,
      name: 'Reserved09',
    },
    {
      code: 6010,
      name: 'Reserved10',
    },
    {
      code: 6011,
      name: 'Reserved11',
    },
    {
      code: 6012,
      name: 'Reserved12',
    },
    {
      code: 6013,
      name: 'Reserved13',
    },
    {
      code: 6014,
      name: 'Reserved14',
    },
    {
      code: 6015,
      name: 'Reserved15',
    },
    {
      code: 6016,
      name: 'Reserved16',
    },
    {
      code: 6017,
      name: 'Reserved17',
    },
    {
      code: 6018,
      name: 'Reserved18',
    },
    {
      code: 6019,
      name: 'Reserved19',
    },
    {
      code: 6020,
      name: 'Reserved20',
    },
    {
      code: 6021,
      name: 'Reserved21',
    },
    {
      code: 6022,
      name: 'Reserved22',
    },
    {
      code: 6023,
      name: 'Reserved23',
    },
    {
      code: 6024,
      name: 'Reserved24',
    },
    {
      code: 6025,
      name: 'Reserved25',
    },
    {
      code: 6026,
      name: 'Reserved26',
    },
    {
      code: 6027,
      name: 'Reserved27',
    },
    {
      code: 6028,
      name: 'Reserved28',
    },
    {
      code: 6029,
      name: 'Reserved29',
    },
    {
      code: 6030,
      name: 'Reserved30',
    },
    {
      code: 6031,
      name: 'Reserved31',
    },
    {
      code: 6032,
      name: 'Reserved32',
    },
    {
      code: 6033,
      name: 'Reserved33',
    },
    {
      code: 6034,
      name: 'Reserved34',
    },
    {
      code: 6035,
      name: 'Reserved35',
    },
    {
      code: 6036,
      name: 'Reserved36',
    },
    {
      code: 6037,
      name: 'Reserved37',
    },
    {
      code: 6038,
      name: 'Reserved38',
    },
    {
      code: 6039,
      name: 'Reserved39',
    },
    {
      code: 6040,
      name: 'Reserved40',
    },
    {
      code: 6041,
      name: 'Reserved41',
    },
    {
      code: 6042,
      name: 'Reserved42',
    },
    {
      code: 6043,
      name: 'Reserved43',
    },
    {
      code: 6044,
      name: 'Reserved44',
    },
    {
      code: 6045,
      name: 'Reserved45',
    },
    {
      code: 6046,
      name: 'Reserved46',
    },
    {
      code: 6047,
      name: 'Reserved47',
    },
    {
      code: 6048,
      name: 'Reserved48',
    },
    {
      code: 6049,
      name: 'Reserved49',
    },
    {
      code: 6050,
      name: 'Reserved50',
    },
    {
      code: 6051,
      name: 'Reserved51',
    },
    {
      code: 6052,
      name: 'Reserved52',
    },
    {
      code: 6053,
      name: 'Reserved53',
    },
    {
      code: 6054,
      name: 'Reserved54',
    },
    {
      code: 6055,
      name: 'Reserved55',
    },
    {
      code: 6056,
      name: 'Reserved56',
    },
    {
      code: 6057,
      name: 'Reserved57',
    },
    {
      code: 6058,
      name: 'Reserved58',
    },
    {
      code: 6059,
      name: 'Reserved59',
    },
  ],
}
