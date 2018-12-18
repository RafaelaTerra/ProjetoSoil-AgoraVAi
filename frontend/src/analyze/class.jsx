import React, { Component } from 'react'

import Grid from '../common/layout/grid'
import Row from '../common/layout/row'
import ValueBox from '../common/widget/valueBox'

export default({scale}) => (
    <Grid cols='12'>
        <fieldset>
            <legend>Nova Análise</legend>
            <Row>
                <ValueBox cols='12 4' color='green' icon='coffee' 
                    value={`${scale}`} text='Bebida'/>
            </Row>
        </fieldset>

    </Grid>
)