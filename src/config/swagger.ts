import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Store',
            version: '1.0.0',
            description: `
                REST API for managing an online store.

                ## Authentication

                1. Register a new account using **POST /auth/register**
                2. Log in using **POST /auth/login**
                3. Copy the access token returned by the API.
                4. Click the **Authorize** button in Swagger UI.
                5. Paste the token using the Bearer scheme.

                Some endpoints require administrator privileges.
                `,

            contact: {
                name: 'Ismael Madarieta',
                url: 'https://github.com/dodonk4/API_Store'
            },

            license: {
                name: 'MIT'
            }
        },

        servers: [
            {
                url: 'https://api-store-qfw2.onrender.com',
                description: 'Production'
            }
        ],


        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter the JWT access token obtained from POST /auth/login.'
                }
            },

            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        username: {
                            type: 'string',
                            example: 'ismael'
                        },
                        email: {
                            type: 'string',
                            example: 'ismael@email.com'
                        },
                        role: {
                            type: 'string',
                            enum: ['ADMIN', 'USER'],
                            example: 'USER'
                        }
                    }
                },

                Product: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            example: 'Gaming Mouse'
                        },
                        description: {
                            type: 'string',
                            nullable: true,
                            example: 'Wireless RGB gaming mouse'
                        },
                        category: {
                            type: 'string',
                            example: 'Electronics'
                        },
                        stock: {
                            type: 'integer',
                            example: 25
                        },
                        price: {
                            type: 'number',
                            format: 'float',
                            example: 24999.99
                        }
                    }
                },

                CreateProductRequest: {
                    type: 'object',
                    required: [
                        'name',
                        'category',
                        'stock',
                        'price'
                    ],
                    properties: {
                        name: {
                            type: 'string',
                            maxLength: 30,
                            example: 'Gaming Mouse'
                        },
                        description: {
                            type: 'string',
                            maxLength: 200,
                            example: 'Wireless RGB gaming mouse'
                        },
                        category: {
                            type: 'string',
                            example: 'Electronics'
                        },
                        stock: {
                            type: 'integer',
                            minimum: 0,
                            example: 25
                        },
                        price: {
                            type: 'number',
                            format: 'float',
                            minimum: 0,
                            example: 24999.99
                        }
                    }
                },

                UpdateProductRequest: {
                    type: 'object',
                    required: [
                        'name',
                        'description',
                        'price',
                        'stock'
                    ],
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Gaming Mouse Pro'
                        },
                        description: {
                            type: 'string',
                            example: 'Updated RGB gaming mouse'
                        },
                        price: {
                            type: 'number',
                            format: 'float',
                            example: 27999.99
                        },
                        stock: {
                            type: 'integer',
                            example: 15
                        }
                    }
                },

                Order: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 15
                        },
                        state: {
                            type: 'string',
                            enum: ['CART', 'PENDING_PAYMENT', 'PAID', 'CANCELED'],
                            example: 'CART'
                        },
                        userId: {
                            type: 'integer',
                            example: 3
                        }
                    }
                },

                OrderProduct: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 7
                        },
                        orderId: {
                            type: 'integer',
                            example: 15
                        },
                        productId: {
                            type: 'integer',
                            example: 2
                        },
                        cantidad: {
                            type: 'integer',
                            example: 3
                        }
                    }
                },

                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            example: 'ismael@email.com'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            example: 'MiPassword123'
                        }
                    }
                },

                LoginResponse: {
                    type: 'object',
                    properties: {
                        accessToken: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                        },
                        refreshToken: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                        }
                    }
                },

                RegisterRequest: {
                    type: 'object',
                    required: [
                        'email',
                        'username',
                        'password',
                        'password_confirmation'
                    ],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'ismael@email.com'
                        },
                        username: {
                            type: 'string',
                            maxLength: 20,
                            example: 'ismael'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            minLength: 8,
                            example: 'MyPassword123'
                        },
                        password_confirmation: {
                            type: 'string',
                            format: 'password',
                            minLength: 8,
                            example: 'MyPassword123'
                        }
                    }
                },

                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Product not found'
                        }
                    }
                },

                ValidationError: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Validation error'
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    }
                }
            },
            responses: {
                BadRequest: {
                    description: 'Invalid request',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },

                Unauthorized: {
                    description: 'Authentication required',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },

                Forbidden: {
                    description: 'Insufficient permissions',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },

                NotFound: {
                    description: 'Resource not found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },

                Conflict: {
                    description: 'Resource conflict',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },

                InternalServerError: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                }
            }
        },



        security: [
            {
                bearerAuth: []
            }
        ],

        tags: [
            {
                name: 'Authentication',
                description: 'Authentication endpoints.'
            },
            {
                name: 'Users',
                description: 'Manage users.'
            },
            {
                name: 'Products',
                description: 'Manage products.'
            },
            {
                name: 'Orders',
                description: 'Manage orders.'
            },
            {
                name: 'Order Products',
                description: 'Manage products inside orders.'
            }
        ]
    },

    apis: ['./src/docs/**/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);