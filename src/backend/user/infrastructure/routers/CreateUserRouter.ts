import express, { Request, Response } from "express";

import { CreateUser } from "../../application/use-cases/CreateUser";
import { UserRepository } from "../../domain/repository/UserRepository";