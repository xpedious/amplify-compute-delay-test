import express from 'express'
import { fromNodeProviderChain } from '@aws-sdk/credential-providers'

const app = express()

// Middleware
app.use(express.json())

async function initializeAWSCredentials(): Promise<void> {
    try {
        const credentials = await fromNodeProviderChain()()
        console.log('AWS credentials initialized successfully', credentials)
    } catch (error) {
        console.error('Failed to initialize AWS credentials:', error)
        throw error
    }
}

function setupRoutes(): void {
    // Health check route
    app.get('/health', (_req, res) => {
        res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
    })

    // Default route
    app.get('/', (_req, res) => {
        res.json({ message: 'Hello from Express' })
    })
}

async function startServer(): Promise<void> {
    try {
        // Initialize AWS credentials first
        await initializeAWSCredentials()

        // Setup routes
        setupRoutes()

        const port = Number(process.env.PORT) || 3000

        if (require.main === module) {
            app.listen(port, () => {
                console.log(`Server listening on http://localhost:${port}`)
                console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
            })
        }
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Unhandled error:', err)
    res.status(500).json({ error: 'Internal server error' })
})

// Start the server
startServer().then(() => console.log('Server started successfully'))

export default app