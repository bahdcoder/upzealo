export type AlterEgo = {
  version: '0.1.0'
  name: 'alter_ego'
  instructions: [
    {
      name: 'initHolder'
      accounts: [
        {
          name: 'manager'
          isMut: true
          isSigner: true
        },
        {
          name: 'wallet'
          isMut: false
          isSigner: false
        },
        {
          name: 'holder'
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
          name: 'rascalsAllocated'
          type: 'u64'
        }
      ]
    },
    {
      name: 'initRascal'
      accounts: [
        {
          name: 'wallet'
          isMut: true
          isSigner: true
        },
        {
          name: 'rascalAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'rascalBox'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascal'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalSource'
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
          name: 'bumpAuth'
          type: 'u8'
        },
        {
          name: 'phase'
          type: 'u8'
        }
      ]
    },
    {
      name: 'updateRascalPhase'
      accounts: [
        {
          name: 'wallet'
          isMut: true
          isSigner: true
        },
        {
          name: 'rascal'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalPhase'
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
          name: 'phase'
          type: 'u8'
        },
        {
          name: 'collection'
          type: 'u8'
        },
        {
          name: 'level'
          type: 'u8'
        },
        {
          name: 'minted'
          type: 'bool'
        }
      ]
    },
    {
      name: 'mintRascalSol'
      accounts: [
        {
          name: 'wallet'
          isMut: true
          isSigner: true
        },
        {
          name: 'rascalMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalAuthority'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalBox'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalDestination'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascal'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalPhase'
          isMut: true
          isSigner: false
        },
        {
          name: 'phaseTwo'
          isMut: true
          isSigner: false
        },
        {
          name: 'feeWallet'
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
      args: [
        {
          name: 'bumpAuth'
          type: 'u8'
        }
      ]
    },
    {
      name: 'mintRascal'
      accounts: [
        {
          name: 'wallet'
          isMut: true
          isSigner: true
        },
        {
          name: 'rascalMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalAuthority'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalBox'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalDestination'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascal'
          isMut: true
          isSigner: false
        },
        {
          name: 'phaseOne'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalPhase'
          isMut: true
          isSigner: false
        },
        {
          name: 'godpassMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'godpassSource'
          isMut: true
          isSigner: false
        },
        {
          name: 'currencyMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'currencySource'
          isMut: true
          isSigner: false
        },
        {
          name: 'currencyDestination'
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
      args: [
        {
          name: 'bumpAuth'
          type: 'u8'
        }
      ]
    },
    {
      name: 'mintRascalFree'
      accounts: [
        {
          name: 'wallet'
          isMut: true
          isSigner: true
        },
        {
          name: 'rascalMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalAuthority'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalBox'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalDestination'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascal'
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
      args: [
        {
          name: 'bumpAuth'
          type: 'u8'
        }
      ]
    },
    {
      name: 'mintRascalSolHolder'
      accounts: [
        {
          name: 'wallet'
          isMut: true
          isSigner: true
        },
        {
          name: 'rascalMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalAuthority'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalBox'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalDestination'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascal'
          isMut: true
          isSigner: false
        },
        {
          name: 'rascalPhase'
          isMut: true
          isSigner: false
        },
        {
          name: 'phaseTwo'
          isMut: true
          isSigner: false
        },
        {
          name: 'holder'
          isMut: true
          isSigner: false
        },
        {
          name: 'feeWallet'
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
      args: [
        {
          name: 'bumpAuth'
          type: 'u8'
        }
      ]
    },
    {
      name: 'updatePhaseOne'
      accounts: [
        {
          name: 'wallet'
          isMut: true
          isSigner: true
        },
        {
          name: 'phaseOne'
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
          name: 'totalMythicAvailable'
          type: 'u64'
        },
        {
          name: 'totalLegendaryAvailable'
          type: 'u64'
        },
        {
          name: 'totalEpicAvailable'
          type: 'u64'
        },
        {
          name: 'totalRareAvailable'
          type: 'u64'
        },
        {
          name: 'totalUncommonAvailable'
          type: 'u64'
        },
        {
          name: 'totalCommonAvailable'
          type: 'u64'
        },
        {
          name: 'totalMythicSecretAvailable'
          type: 'u64'
        },
        {
          name: 'totalLegendarySecretAvailable'
          type: 'u64'
        },
        {
          name: 'totalEpicSecretAvailable'
          type: 'u64'
        },
        {
          name: 'totalRareSecretAvailable'
          type: 'u64'
        },
        {
          name: 'totalUncommonSecretAvailable'
          type: 'u64'
        },
        {
          name: 'totalCommonSecretAvailable'
          type: 'u64'
        },
        {
          name: 'totalMinted'
          type: 'u64'
        }
      ]
    },
    {
      name: 'updatePhaseTwo'
      accounts: [
        {
          name: 'wallet'
          isMut: true
          isSigner: true
        },
        {
          name: 'phaseTwo'
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
          name: 'totalMythicAvailable'
          type: 'u64'
        },
        {
          name: 'totalLegendaryAvailable'
          type: 'u64'
        },
        {
          name: 'totalEpicAvailable'
          type: 'u64'
        },
        {
          name: 'totalRareAvailable'
          type: 'u64'
        },
        {
          name: 'totalUncommonAvailable'
          type: 'u64'
        },
        {
          name: 'totalCommonAvailable'
          type: 'u64'
        },
        {
          name: 'totalMythicSecretAvailable'
          type: 'u64'
        },
        {
          name: 'totalLegendarySecretAvailable'
          type: 'u64'
        },
        {
          name: 'totalEpicSecretAvailable'
          type: 'u64'
        },
        {
          name: 'totalRareSecretAvailable'
          type: 'u64'
        },
        {
          name: 'totalUncommonSecretAvailable'
          type: 'u64'
        },
        {
          name: 'totalCommonSecretAvailable'
          type: 'u64'
        },
        {
          name: 'totalMinted'
          type: 'u64'
        }
      ]
    }
  ]
  accounts: [
    {
      name: 'holder'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'wallet'
            type: 'publicKey'
          },
          {
            name: 'rascalsAllocated'
            type: 'u64'
          },
          {
            name: 'rascalsMinted'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'mintPhase'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'mythic'
            type: 'u64'
          },
          {
            name: 'legendary'
            type: 'u64'
          },
          {
            name: 'epic'
            type: 'u64'
          },
          {
            name: 'rare'
            type: 'u64'
          },
          {
            name: 'uncommon'
            type: 'u64'
          },
          {
            name: 'common'
            type: 'u64'
          },
          {
            name: 'mythicSecret'
            type: 'u64'
          },
          {
            name: 'legendarySecret'
            type: 'u64'
          },
          {
            name: 'epicSecret'
            type: 'u64'
          },
          {
            name: 'rareSecret'
            type: 'u64'
          },
          {
            name: 'uncommonSecret'
            type: 'u64'
          },
          {
            name: 'commonSecret'
            type: 'u64'
          },
          {
            name: 'totalMythicAvailable'
            type: 'u64'
          },
          {
            name: 'totalLegendaryAvailable'
            type: 'u64'
          },
          {
            name: 'totalEpicAvailable'
            type: 'u64'
          },
          {
            name: 'totalRareAvailable'
            type: 'u64'
          },
          {
            name: 'totalUncommonAvailable'
            type: 'u64'
          },
          {
            name: 'totalCommonAvailable'
            type: 'u64'
          },
          {
            name: 'totalMythicSecretAvailable'
            type: 'u64'
          },
          {
            name: 'totalLegendarySecretAvailable'
            type: 'u64'
          },
          {
            name: 'totalEpicSecretAvailable'
            type: 'u64'
          },
          {
            name: 'totalRareSecretAvailable'
            type: 'u64'
          },
          {
            name: 'totalUncommonSecretAvailable'
            type: 'u64'
          },
          {
            name: 'totalCommonSecretAvailable'
            type: 'u64'
          },
          {
            name: 'reservedZero'
            type: 'bool'
          },
          {
            name: 'reservedOne'
            type: 'publicKey'
          },
          {
            name: 'reservedTwo'
            type: 'string'
          },
          {
            name: 'reservedThree'
            type: 'publicKey'
          },
          {
            name: 'reservedFour'
            type: 'u8'
          },
          {
            name: 'reservedFive'
            type: 'string'
          },
          {
            name: 'totalMinted'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'rascalPhase'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'mint'
            type: 'publicKey'
          },
          {
            name: 'collection'
            type: 'u8'
          },
          {
            name: 'phase'
            type: 'u8'
          },
          {
            name: 'level'
            type: 'u8'
          },
          {
            name: 'minted'
            type: 'bool'
          },
          {
            name: 'reservedOne'
            type: 'publicKey'
          },
          {
            name: 'reservedTwo'
            type: 'string'
          },
          {
            name: 'reservedThree'
            type: 'publicKey'
          },
          {
            name: 'reservedFour'
            type: 'u8'
          },
          {
            name: 'reservedFive'
            type: 'string'
          },
          {
            name: 'reservedSix'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'rascal'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'mint'
            type: 'publicKey'
          },
          {
            name: 'mintedBy'
            type: 'publicKey'
          },
          {
            name: 'minted'
            type: 'bool'
          },
          {
            name: 'phase'
            type: 'u8'
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
      name: 'CurrencyAndStrategyNotSupported'
      msg: 'Currency and strategy not supported yet.'
    },
    {
      code: 6006
      name: 'InvalidAmount'
      msg: 'Invalid amount passed for contract'
    },
    {
      code: 6007
      name: 'InvalidDatesProvided'
      msg: 'Invalid dates were provided for the job contract.'
    },
    {
      code: 6008
      name: 'InstructionCalledByInvalidRole'
      msg: 'This instruction can only be called by a specific role, contractor or project'
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

export const IDL: AlterEgo = {
  version: '0.1.0',
  name: 'alter_ego',
  instructions: [
    {
      name: 'initHolder',
      accounts: [
        {
          name: 'manager',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'wallet',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'holder',
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
          name: 'rascalsAllocated',
          type: 'u64',
        },
      ],
    },
    {
      name: 'initRascal',
      accounts: [
        {
          name: 'wallet',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'rascalAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rascalBox',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalSource',
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
          name: 'bumpAuth',
          type: 'u8',
        },
        {
          name: 'phase',
          type: 'u8',
        },
      ],
    },
    {
      name: 'updateRascalPhase',
      accounts: [
        {
          name: 'wallet',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'rascal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalPhase',
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
          name: 'phase',
          type: 'u8',
        },
        {
          name: 'collection',
          type: 'u8',
        },
        {
          name: 'level',
          type: 'u8',
        },
        {
          name: 'minted',
          type: 'bool',
        },
      ],
    },
    {
      name: 'mintRascalSol',
      accounts: [
        {
          name: 'wallet',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'rascalMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalAuthority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalBox',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalDestination',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalPhase',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'phaseTwo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'feeWallet',
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
      args: [
        {
          name: 'bumpAuth',
          type: 'u8',
        },
      ],
    },
    {
      name: 'mintRascal',
      accounts: [
        {
          name: 'wallet',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'rascalMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalAuthority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalBox',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalDestination',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'phaseOne',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalPhase',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'godpassMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'godpassSource',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'currencyMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'currencySource',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'currencyDestination',
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
      args: [
        {
          name: 'bumpAuth',
          type: 'u8',
        },
      ],
    },
    {
      name: 'mintRascalFree',
      accounts: [
        {
          name: 'wallet',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'rascalMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalAuthority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalBox',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalDestination',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascal',
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
      args: [
        {
          name: 'bumpAuth',
          type: 'u8',
        },
      ],
    },
    {
      name: 'mintRascalSolHolder',
      accounts: [
        {
          name: 'wallet',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'rascalMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalAuthority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalBox',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalDestination',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rascalPhase',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'phaseTwo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'holder',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'feeWallet',
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
      args: [
        {
          name: 'bumpAuth',
          type: 'u8',
        },
      ],
    },
    {
      name: 'updatePhaseOne',
      accounts: [
        {
          name: 'wallet',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'phaseOne',
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
          name: 'totalMythicAvailable',
          type: 'u64',
        },
        {
          name: 'totalLegendaryAvailable',
          type: 'u64',
        },
        {
          name: 'totalEpicAvailable',
          type: 'u64',
        },
        {
          name: 'totalRareAvailable',
          type: 'u64',
        },
        {
          name: 'totalUncommonAvailable',
          type: 'u64',
        },
        {
          name: 'totalCommonAvailable',
          type: 'u64',
        },
        {
          name: 'totalMythicSecretAvailable',
          type: 'u64',
        },
        {
          name: 'totalLegendarySecretAvailable',
          type: 'u64',
        },
        {
          name: 'totalEpicSecretAvailable',
          type: 'u64',
        },
        {
          name: 'totalRareSecretAvailable',
          type: 'u64',
        },
        {
          name: 'totalUncommonSecretAvailable',
          type: 'u64',
        },
        {
          name: 'totalCommonSecretAvailable',
          type: 'u64',
        },
        {
          name: 'totalMinted',
          type: 'u64',
        },
      ],
    },
    {
      name: 'updatePhaseTwo',
      accounts: [
        {
          name: 'wallet',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'phaseTwo',
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
          name: 'totalMythicAvailable',
          type: 'u64',
        },
        {
          name: 'totalLegendaryAvailable',
          type: 'u64',
        },
        {
          name: 'totalEpicAvailable',
          type: 'u64',
        },
        {
          name: 'totalRareAvailable',
          type: 'u64',
        },
        {
          name: 'totalUncommonAvailable',
          type: 'u64',
        },
        {
          name: 'totalCommonAvailable',
          type: 'u64',
        },
        {
          name: 'totalMythicSecretAvailable',
          type: 'u64',
        },
        {
          name: 'totalLegendarySecretAvailable',
          type: 'u64',
        },
        {
          name: 'totalEpicSecretAvailable',
          type: 'u64',
        },
        {
          name: 'totalRareSecretAvailable',
          type: 'u64',
        },
        {
          name: 'totalUncommonSecretAvailable',
          type: 'u64',
        },
        {
          name: 'totalCommonSecretAvailable',
          type: 'u64',
        },
        {
          name: 'totalMinted',
          type: 'u64',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'holder',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'wallet',
            type: 'publicKey',
          },
          {
            name: 'rascalsAllocated',
            type: 'u64',
          },
          {
            name: 'rascalsMinted',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'mintPhase',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'mythic',
            type: 'u64',
          },
          {
            name: 'legendary',
            type: 'u64',
          },
          {
            name: 'epic',
            type: 'u64',
          },
          {
            name: 'rare',
            type: 'u64',
          },
          {
            name: 'uncommon',
            type: 'u64',
          },
          {
            name: 'common',
            type: 'u64',
          },
          {
            name: 'mythicSecret',
            type: 'u64',
          },
          {
            name: 'legendarySecret',
            type: 'u64',
          },
          {
            name: 'epicSecret',
            type: 'u64',
          },
          {
            name: 'rareSecret',
            type: 'u64',
          },
          {
            name: 'uncommonSecret',
            type: 'u64',
          },
          {
            name: 'commonSecret',
            type: 'u64',
          },
          {
            name: 'totalMythicAvailable',
            type: 'u64',
          },
          {
            name: 'totalLegendaryAvailable',
            type: 'u64',
          },
          {
            name: 'totalEpicAvailable',
            type: 'u64',
          },
          {
            name: 'totalRareAvailable',
            type: 'u64',
          },
          {
            name: 'totalUncommonAvailable',
            type: 'u64',
          },
          {
            name: 'totalCommonAvailable',
            type: 'u64',
          },
          {
            name: 'totalMythicSecretAvailable',
            type: 'u64',
          },
          {
            name: 'totalLegendarySecretAvailable',
            type: 'u64',
          },
          {
            name: 'totalEpicSecretAvailable',
            type: 'u64',
          },
          {
            name: 'totalRareSecretAvailable',
            type: 'u64',
          },
          {
            name: 'totalUncommonSecretAvailable',
            type: 'u64',
          },
          {
            name: 'totalCommonSecretAvailable',
            type: 'u64',
          },
          {
            name: 'reservedZero',
            type: 'bool',
          },
          {
            name: 'reservedOne',
            type: 'publicKey',
          },
          {
            name: 'reservedTwo',
            type: 'string',
          },
          {
            name: 'reservedThree',
            type: 'publicKey',
          },
          {
            name: 'reservedFour',
            type: 'u8',
          },
          {
            name: 'reservedFive',
            type: 'string',
          },
          {
            name: 'totalMinted',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'rascalPhase',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'mint',
            type: 'publicKey',
          },
          {
            name: 'collection',
            type: 'u8',
          },
          {
            name: 'phase',
            type: 'u8',
          },
          {
            name: 'level',
            type: 'u8',
          },
          {
            name: 'minted',
            type: 'bool',
          },
          {
            name: 'reservedOne',
            type: 'publicKey',
          },
          {
            name: 'reservedTwo',
            type: 'string',
          },
          {
            name: 'reservedThree',
            type: 'publicKey',
          },
          {
            name: 'reservedFour',
            type: 'u8',
          },
          {
            name: 'reservedFive',
            type: 'string',
          },
          {
            name: 'reservedSix',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'rascal',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'mint',
            type: 'publicKey',
          },
          {
            name: 'mintedBy',
            type: 'publicKey',
          },
          {
            name: 'minted',
            type: 'bool',
          },
          {
            name: 'phase',
            type: 'u8',
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
      name: 'CurrencyAndStrategyNotSupported',
      msg: 'Currency and strategy not supported yet.',
    },
    {
      code: 6006,
      name: 'InvalidAmount',
      msg: 'Invalid amount passed for contract',
    },
    {
      code: 6007,
      name: 'InvalidDatesProvided',
      msg: 'Invalid dates were provided for the job contract.',
    },
    {
      code: 6008,
      name: 'InstructionCalledByInvalidRole',
      msg: 'This instruction can only be called by a specific role, contractor or project',
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
