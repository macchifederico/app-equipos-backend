import { Request, Response } from 'express';
import jugadorService from '../services/JugadorService';
import { Jugador } from '../models/Jugador';

class JugadorController {

    public async getPlayers(req: Request, res: Response): Promise<void> {       
        try {
            const {id_usuario} = req.body;
            
            if (!id_usuario) {
                res.status(400).json({
                    error: 'id_usuario is required'
                });
                return;
            }

            const data = await jugadorService.getPlayers(id_usuario);
            res.status(200).json({
                players: data.players
            });
        } catch (error) {
            console.error('Error getting players:', error);
            res.status(500).json({
                error: 'Error retrieving players'
            });
        }
    }
    
    public async createPlayer(req: Request, res: Response): Promise<void> {
        try {
            const {jugador} = req.body;
            
            if (!jugador) {
                res.status(400).json({
                    error: 'jugador data is required'
                });
                return;
            }

            const data = await jugadorService.createPlayer(jugador);
            
            if (data.status) {
                res.status(201).json({
                    message: 'Player created successfully',
                    data: data
                });
            } else {
                res.status(400).json({
                    error: 'Failed to create player',
                    details: data.error
                });
            }
        } catch (error) {
            console.error('Error creating player:', error);
            res.status(500).json({
                error: 'Error creating player'
            });
        }
    }

    public async updatePlayersByEquipoId(req: Request, res: Response): Promise<void> {
        try {
            const {teamOne, teamTwo} = req.body;
            
            if (!teamOne || !teamTwo) {
                res.status(400).json({
                    error: 'teamOne and teamTwo are required'
                });
                return;
            }

            await jugadorService.updatePlayersByEquipoId(teamOne, teamTwo);
            
            res.status(200).json({
                message: 'Teams updated successfully'
            });
        } catch (error) {
            console.error('Error updating teams:', error);
            res.status(500).json({
                error: 'Error updating teams'
            });
        }
    }

    public async getTeams(req: Request, res: Response): Promise<void> {
        try {
            const {id_usuario} = req.body;
            
            if (!id_usuario) {
                res.status(400).json({
                    error: 'id_usuario is required'
                });
                return;
            }

            const data = await jugadorService.getTeams(id_usuario);
            
            if (data.error) {
                res.status(500).json({
                    error: data.error
                });
                return;
            }

            res.status(200).json({
                teams: data.teams
            });
        } catch (error) {
            console.error('Error getting teams:', error);
            res.status(500).json({
                error: 'Error retrieving teams'
            });
        }
    }

    public async deletePlayer(req: Request, res: Response): Promise<void> {
        try {
            const {id_jugador, id_usuario} = req.body;

            if (!id_jugador || !id_usuario) {
                res.status(400).json({
                    error: 'id_jugador and id_usuario are required'
                });
                return;
            }

            const data = await jugadorService.deletePlayer(id_jugador, id_usuario);
            
            if (data.error) {
                res.status(500).json({
                    error: data.error
                });
                return;
            }

            res.status(200).json({
                message: 'Player deleted successfully',
                data: data
            });
        } catch (error) {
            console.error('Error deleting player:', error);
            res.status(500).json({
                error: 'Error deleting player'
            });
        }
    }
}

const jugadorController = new JugadorController();
export default jugadorController;