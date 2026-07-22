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
                url: "https://api-store-qfw2.onrender.com/",
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
                            example: 'juan'
                        },
                        email: {
                            type: 'string',
                            example: 'juan@example.com'
                        },
                        role: {
                            type: 'string',
                            enum: ['ADMIN', 'USER'],
                            example: 'USER'
                        }
                    }
                },

                UpdateUserRequest: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            example: 'Juan Ignacio'
                        },
                    }
                },

                UpdateOrderRequest: {
                    type: 'object',
                    properties: {
                        state: {
                            type: 'string',
                            example: 'CART'
                        }
                    }
                },

                CreateOrderRequest: {
                    type: 'object',
                    properties: {

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

                UpdateOrderProductRequest: {
                    type: 'object',
                    properties: {
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

                CreateOrderProductRequest: {
                    type: 'object',
                    properties: {
                        productId: {
                            type: 'integer',
                            example: 8
                        },
                        cantidad: {
                            type: 'integer',
                            example: 2
                        }
                    }
                },

                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            example: 'juan@example.com'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            example: 'abcd1234'
                        }
                    }
                },

                LoginResponse: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: '3'
                        },
                        username: {
                            type: 'string',
                            example: 'Carlos López...'
                        },
                        email: {
                            type: 'string',
                            example: 'carlos@example.com'
                        },
                        rol: {
                            type: 'string',
                            example: 'USER'
                        },
                        accesstoken: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...'
                        },
                        createdAt: {
                            type: 'string',
                            example: '2026-07-17T01:25:03.619Z'
                        },
                        updatedAt: {
                            type: 'string',
                            example: '2026-07-22T00:02:45.018Z'
                        }
                    }
                },

                RefreshTokenResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Access token updated'
                        },
                        accesToken: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJDYXJsb3MgTMOzcGV6Iiwicm9sIjoiVVNFUiIsImlhdCI6MTc4NDY3Nzg5MywiZXhwIjoxNzg0Njc4NzkzfQ.6MOxG5H4O2jHfhyEREiBiCjsjH9mrGWpr7o4QcYSNeM',
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
                            example: 'prueba@gmail.com'
                        },
                        username: {
                            type: 'string',
                            maxLength: 20,
                            example: 'prueba'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            minLength: 8,
                            example: 'abcd1234'
                        },
                        password_confirmation: {
                            type: 'string',
                            format: 'password',
                            minLength: 8,
                            example: 'abcd1234'
                        }
                    }
                },

                CreateUserRequest: {
                    type: 'object',
                    required: [
                        'email',
                        'username',
                        'password',
                    ],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'prueba@gmail.com'
                        },
                        username: {
                            type: 'string',
                            maxLength: 20,
                            example: 'prueba'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            minLength: 8,
                            example: 'abcd1234'
                        },
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