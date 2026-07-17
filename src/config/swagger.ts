import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Store',
            version: '1.0.0',
            description: 'REST API para la gestión de una tienda online.'
        },

        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development Server'
            }
        ],


        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
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
                        nombre: {
                            type: 'string',
                            example: 'Mouse Gamer'
                        },
                        descripcion: {
                            type: 'string',
                            example: 'Mouse inalámbrico RGB'
                        },
                        precio: {
                            type: 'number',
                            format: 'float',
                            example: 24999.99
                        },
                        stock: {
                            type: 'integer',
                            example: 20
                        }
                    }
                },

                CreateProductRequest: {
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
                            example: 'Gaming Mouse'
                        },
                        description: {
                            type: 'string',
                            example: 'Wireless RGB gaming mouse'
                        },
                        price: {
                            type: 'number',
                            format: 'float',
                            example: 24999.99
                        },
                        stock: {
                            type: 'integer',
                            example: 20
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
                        estado: {
                            type: 'string',
                            enum: ['PENDIENTE', 'PAGADA', 'CANCELADA'],
                            example: 'PENDIENTE'
                        },
                        usuarioId: {
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
                        ordenId: {
                            type: 'integer',
                            example: 15
                        },
                        productoId: {
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
        ]
    },

    apis: ['./src/routes/**/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);