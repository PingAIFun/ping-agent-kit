import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';
import { PublicKey } from '@solana/web3.js';
import { KeypairWallet, SolanaAgentKit } from "solana-agent-kit";
import TokenPlugin from "@solana-agent-kit/plugin-token";
import { Keypair } from '@solana/web3.js';
import bs58 from "bs58";


function createKeypairFromPrivateKeyString(privateKeyString: string) {
	return Keypair.fromSecretKey(bs58.decode(privateKeyString));
}

class SolanaAgent implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Solana Token Agent',
		name: 'solanaAgent',
		icon: 'file:solana.svg',
		group: ['blockchain'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Solana tokens using AI',
		defaults: {
			name: 'Solana Token Agent',
		},
		inputs: [
			{
				displayName: 'Input',
				maxConnections: 1,
				required: true,
				type: NodeConnectionType.Main,
			},
		],
		outputs: [
			{
				displayName: 'Output',
				maxConnections: 1,
				type: NodeConnectionType.Main,
			},
		],
		credentials: [
			{
				name: 'solanaApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Create Token',
						value: 'createToken',
						description: 'Create a new token',
						action: 'Create a new token',
					},
					{
						name: 'Transfer Token',
						value: 'transferToken',
						description: 'Transfer tokens',
						action: 'Transfer tokens',
					},
					{
						name: 'Get Token Balances',
						value: 'getTokenBalances',
						description: 'Get all token balances for a wallet',
						action: 'Get token balances',
					},
					{
						name: 'Get Single Token Balance',
						value: 'getSingleBalance',
						description: 'Get balance for a specific token',
						action: 'Get single token balance',
					},
					{
						name: 'Get Other Wallet Balance',
						value: 'getOtherBalance',
						description: 'Get token balance for another wallet',
						action: 'Get other wallet balance',
					},
					{
						name: 'Close Empty Token Accounts',
						value: 'closeEmptyTokenAccounts',
						description: 'Close empty token accounts',
						action: 'Close empty token accounts',
					},
					{
						name: 'Request Faucet Funds',
						value: 'requestFaucet',
						description: 'Request SOL from faucet (devnet/testnet)',
						action: 'Request faucet funds',
					},
					{
						name: 'Get Network TPS',
						value: 'getTPS',
						description: 'Get current network TPS',
						action: 'Get network TPS',
					},
					{
						name: 'Get Wallet Address',
						value: 'getWalletAddress',
						description: 'Get current wallet address',
						action: 'Get wallet address',
					},
				],
				default: 'createToken',
			},
			// Token Creation Parameters
			{
				displayName: 'Token Name',
				name: 'tokenName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['createToken'],
					},
				},
				default: '',
				description: 'Name of the token to create',
			},
			{
				displayName: 'Token Symbol',
				name: 'tokenSymbol',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['createToken'],
					},
				},
				default: '',
				description: 'Symbol of the token to create',
			},
			{
				displayName: 'Decimals',
				name: 'decimals',
				type: 'number',
				required: false,
				displayOptions: {
					show: {
						operation: ['createToken'],
					},
				},
				default: 9,
				description: 'Number of decimal places for the token',
			},
			{
				displayName: 'Initial Supply',
				name: 'initialSupply',
				type: 'number',
				required: false,
				displayOptions: {
					show: {
						operation: ['createToken'],
					},
				},
				default: 0,
				description: 'Initial supply of tokens to mint',
			},
			// Transfer Parameters
			{
				displayName: 'Recipient Address',
				name: 'recipientAddress',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['transferToken'],
					},
				},
				default: '',
				description: 'Recipient wallet address',
			},
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						operation: ['transferToken'],
					},
				},
				default: 0,
				description: 'Amount to transfer',
			},
			{
				displayName: 'Token Address',
				name: 'tokenAddress',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						operation: ['transferToken', 'getSingleBalance'],
					},
				},
				default: '',
				description: 'SPL token address (leave empty for SOL)',
			},
			// Balance Parameters
			{
				displayName: 'Wallet Address',
				name: 'walletAddress',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						operation: ['getTokenBalances', 'getOtherBalance'],
					},
				},
				default: '',
				description: 'Wallet address to check balances for (leave empty for own wallet)',
			},
			{
				displayName: 'Token Address for Other Wallet',
				name: 'otherTokenAddress',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						operation: ['getOtherBalance'],
					},
				},
				default: '',
				description: 'Token address to check balance for (leave empty for SOL)',
			},
		],
	};

	

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;
		
		// Get credentials
		const credentials = await this.getCredentials('solanaApi');

		const wallet = new KeypairWallet(
			createKeypairFromPrivateKeyString(credentials.privateKey as string),
			credentials.rpcUrl as string
		)
		
		// Initialize Solana Agent Kit
		const agent = new SolanaAgentKit(
			wallet,
			credentials.rpcUrl as string,
			{OPENAI_API_KEY: credentials.openAiApiKey as string},
		).use(TokenPlugin)

		for (let i = 0; i < items.length; i++) {
			try {
				let result;
				
				switch (operation) {
					// case 'createToken':
					// 	const tokenName = this.getNodeParameter('tokenName', i) as string;
					// 	const tokenSymbol = this.getNodeParameter('tokenSymbol', i) as string;
					// 	const decimals = this.getNodeParameter('decimals', i) as number;
					// 	const initialSupply = this.getNodeParameter('initialSupply', i) as number;
						
					// 	result = await agent.deployToken({
					// 		name: tokenName,
					// 		symbol: tokenSymbol,
					// 		decimals,
					// 		initialSupply,
					// 	});
					// 	break;

					case 'transferToken':
						const recipientAddress = new PublicKey(this.getNodeParameter('recipientAddress', i) as string);
						const amount = this.getNodeParameter('amount', i) as number;
						const tokenAddress = this.getNodeParameter('tokenAddress', i) as string;
						const mintAddress = tokenAddress ? new PublicKey(tokenAddress) : undefined;
						result = await agent.methods.transfer(agent, recipientAddress, amount, mintAddress);
						break;

					case 'getTokenBalances':
						const walletAddress = this.getNodeParameter('walletAddress', i) as string;
						const walletPubkey = walletAddress ? new PublicKey(walletAddress) : undefined;
						result = await agent.methods.get_token_balance(agent, walletPubkey);
						break;

					case 'getSingleBalance':
						const singleTokenAddress = this.getNodeParameter('tokenAddress', i) as string;
						const singleMintAddress = singleTokenAddress ? new PublicKey(singleTokenAddress) : undefined;
						
						result = await agent.methods.get_balance(agent, singleMintAddress);
						break;

					case 'getOtherBalance':
						const otherWalletAddress = new PublicKey(this.getNodeParameter('walletAddress', i) as string);
						const otherTokenAddress = this.getNodeParameter('otherTokenAddress', i) as string;
						const otherMintAddress = otherTokenAddress ? new PublicKey(otherTokenAddress) : undefined;
						
						result = await agent.methods.get_balance_other(agent, otherWalletAddress, otherMintAddress);
						break;

					case 'closeEmptyTokenAccounts':
						result = await agent.methods.closeEmptyTokenAccounts(agent);
						break;

					case 'requestFaucet':
						result = await agent.methods.request_faucet_funds(agent);
						break;

					case 'getTPS':
						result = await agent.methods.getTPS(agent);
						break;

					case 'getWalletAddress':
						result = agent.methods.getWalletAddress(agent as any);
						break;

					default:
						throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported!`);
				}

				returnData.push({
					json: {result},
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
					});
					continue;
				}
				throw error;
			}
		}
		
		return [returnData];
	}
}

// Export the class
export { SolanaAgent }; 